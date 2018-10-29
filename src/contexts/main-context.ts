import { computed, observable } from 'mobx'
import { sortBy, map } from 'lodash'

import { Category, Option, Project } from '../models'
import ProjectContext from './project-context'
import spreadsheet from '../core/spreadsheet'

export type SaveRecord = {
  [categoryId: string]: Option[]
}

class MainContext {
  @computed get projects(): Project[] {
    return ProjectContext.projects
  }

  @computed get activeProject(): Project {
    return this.projects.find(project => project.isActive)
  }

  saveRecord(records: SaveRecord): Promise<any> {
    return this.getTabInfo()
      .then(tabInfo => {
        const project = this.activeProject
        const sortedCategories = sortBy(project.categories, c => c.orderIndex)

        const categotyValues = map(sortedCategories, (c: Category) => {
          const selectedOptions = records[c.id]
          if (selectedOptions) {
            return selectedOptions.map(o => o.name).join(', ')
          }
          else {
            return ''
          }
        })

        // Cells order [ Date | URL | Category1 | Category2 | ... | CategoryN ]
        const row = [
          '',
          `=HYPERLINK("${tabInfo.tabUrl}","${tabInfo.title}")`,
          ...categotyValues
        ]

        return spreadsheet.addRow([row], project.spreadsheetId)
      })
  }

  private getTabInfo(): Promise<{tabId: string; tabUrl: string; title: string}> {
    return new Promise((resolve => {
      window.chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var activeTab = tabs[0];
        resolve({
          tabId: activeTab.id,
          tabUrl: activeTab.url,
          title: activeTab.title
        })
      });
    }))

  }
}

export default new MainContext()
