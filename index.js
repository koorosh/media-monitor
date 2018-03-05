const API_KEY = 'AIzaSyCh4KU1aTpx9fl2TRVjxtn8aM3o1n_xFYs';

function configureAxias(userToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
}

function getToken() {
    return new Promise((resolve, reject) => {
        try {
            chrome.identity.getAuthToken({ 'interactive': true }, (token) => {
                resolve(token)
            });
        }
        catch (error) {
            reject(error);
        }
    });
}

function createSpreadsheet(name) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets`;

    const body = {
        properties: {
            title: name
        }
    };

    const requestConfig = {
        params: {
            fields: 'properties/title,sheets/properties/sheetId,spreadsheetId'
        }
    };

    return axios.post(url, body, requestConfig);
}

document.addEventListener('DOMContentLoaded', function () {

    const authButton = document.getElementById('auth-btn');
    const spreadsheetNameInput = document.getElementById('spreadsheet-name-input');
    const newSpreadsheetBtn = document.getElementById('create-spreadsheet');

    const initState = getToken()
        .then((token) => {
            return new Promise((resolve, reject) => {
                if(token) {
                    resolve(token);
                } else {
                    reject('User is not logged in');
                }
            })
        })
        .then((token) => {
            return new Promise((resolve) => {
                configureAxias(token);
                resolve();
            })
        });

    initState.then(() => {
        authButton.addEventListener('click', () => {
            authentificate()
        });

        newSpreadsheetBtn.addEventListener('click', () => {
            const name = spreadsheetNameInput.value;
            createSpreadsheet(name);
        });
    });
});


