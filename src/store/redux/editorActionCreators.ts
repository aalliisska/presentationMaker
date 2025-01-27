import { Editor } from '../type'
import { ActionType, EditorAction } from './action'

function setEditor(newEditor: Editor): EditorAction {
  return {
    type: ActionType.SET_EDITOR,
    payload: newEditor
  }
}

function renamePresentationTitle(title: string) {
  return {
    type: ActionType.RENAME_PRESENTATION_TITLE,
    payload: {title: title}
  }
}

export {
  setEditor,
  renamePresentationTitle
}