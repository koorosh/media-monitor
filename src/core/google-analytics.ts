const sendEvent = (category: GACategories, action: GAActions, label?: string) => {
  window._gaq.push(['_trackEvent', category, action, label])
}

export enum GACategories {
  USER = 'user',
  MAIN = 'main',
  OPTIONS = 'options'
}

export enum GAActions {
  USER_INIT = 'logged_in_as',
  SELECT_OPTION = 'select_option',
  SAVE_RESULT = 'save_result',
  CREATE_PROJECT = 'create_project',
  UPDATE_PROJECT = 'update_project',
  NEW_PROJECT = 'new_or_edit_project',
  ADD_CATEGORY = 'add_category',
  ADD_CATEGORY_OPTION = 'add_category_option',
  CLOSE_PROJECT = 'close_project',
  SET_ACTIVE = 'set_active_project',
  CHANGE_CUSTOM_OPTION = 'type_custom_option'
}

export default {
  sendEvent
}