import { ActionType, SetSelectionAction, DeselectSelectionAction } from "./action"

function setSelection({type}: {type: 'slide' | 'object'}, {id}: {id: string}): SetSelectionAction {
  return {
    type: ActionType.SET_SELECTION,
    payload: {
      type: type,
      id: id
    }
  }
}

function deselectSelection({type}: {type: 'slide' | 'object'}): DeselectSelectionAction {
  return {
    type: ActionType.DESELECT_SELECTION,
    payload: {
      type: type,
    }
  }
}

export {
  setSelection,
  deselectSelection
}