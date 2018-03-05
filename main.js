function createProject(name) {
    var parseResponse = function (response) {
        var result = response.result;
        return {
            spreadsheetId: result.spreadsheetId,
            title: result.properties.title,
            sheetId: result.sheets[0].properties.sheetId,
            isActive: true
        };
    };

    var spreadsheetBody = {
        properties: {
            title: name
        }
    };

    var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);

    request.then(function (response) {
        var spreadsheet = parseResponse(response);
        updateItemStorage(spreadsheet.spreadsheetId, spreadsheet);
        console.log(spreadsheet)
    }, function (reason) {
        console.error('error: ' + reason.result.error.message);
    });
}

function updateItemStorage(projectName, data, callback = ()=>{}) {
    var items = {};
    items[projectName] = data;
    // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
    // optional callback since we don't need to perform any action once the
    // background color is saved.
    chrome.storage.sync.set(items, callback);
}

function updateStorage(data, callback) {
    chrome.storage.sync.set(data, callback);
}

function setActiveProject(spreadsheetId, callback) {
    getAllProjectsFromStorage((projects) => {
        var updatedItems = projects.map(project => {
            project.isActive = project.spreadsheetId === spreadsheetId;
            return project;
        });

        updateStorage(updatedItems, callback);
    })
}

function getAllProjectsFromStorage(callback) {
    chrome.storage.sync.get(null, function (items) {
        callback(chrome.runtime.lastError ? null : items)
    });
}

document.addEventListener('DOMContentLoaded', function () {

    console.log('loaded page');
    var dropdown = $(document.getElementById('dropdown'));
    var inputProjectName = document.getElementById('project-name');

    handleClientLoad((isSignedIn) => {
        console.log('handleClientLoad callback');
        if (isSignedIn) {

            console.log('is signed');


            $('#storage-btn').on('click', () => {
                getAllProjectsFromStorage((items) => {
                    console.log(items)
                })
            });

            // getAllProjectsFromStorage((items) => {
            //     dropdown.append(`<option selected disabled hidden value=''></option>`);
            //
            //     Object.values(items).forEach((item) => {
            //         dropdown.append(`<option ${item.isActive ? 'selected' : ''} value=${item.spreadsheetId}>${item.name}</option>`);
            //     });
            //
            //     dropdown.on('change', () => {
            //         setActiveProject(dropdown.value);
            //     })
            // });


        }
    });

    $('#create-project-btn').on('click', () => {
        createProject(inputProjectName.value);
    })

    $('#storage-btn').on('click', () => {
        handleClientLoad()
    });

});