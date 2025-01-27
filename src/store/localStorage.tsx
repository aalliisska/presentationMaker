import { Middleware } from "redux"
import { defaultEditor } from "./presentationData"
import { Editor } from '../store/type'
import Ajv from "ajv"
import addFormats from "ajv-formats"
import { presentationSchema } from "./presentationShema"

const KEY = 'editor'

const saveLocalStorage: Middleware = store => next => action => {
  const result = next(action)

  const stateToSave = store.getState()
  localStorage.setItem(KEY, JSON.stringify(stateToSave))

  return result
}

function validateEditor(editorData: Editor) {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(presentationSchema);
  const isValid = validate(editorData)
  if (!isValid) {
    console.error('Validation errors:', validate.errors)
  }
  return isValid;
}


const loadLocalStorage = (): Editor => {
  try {
    const localStorageData = localStorage.getItem(KEY)
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData) as Editor
      if (validateEditor(parsedData)) {
        return parsedData
      } else {
        console.error('Validation errors')
      }
    }
    return defaultEditor
  } catch (error) {
    console.error('Error loading from localStorage', error)
    return defaultEditor
  }
}

export {
  saveLocalStorage,
  loadLocalStorage
}

/* import { getEditor } from "../store/editor"
import {Editor} from "./type"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import { presentationSchema } from "./presentationShema"

function saveLocalStorage() {
  const currentState = JSON.stringify(getEditor());
  if (localStorage.getItem('editorState') !== currentState) {
    localStorage.setItem('editorState', currentState)
  }
}

function loadLocalStorage(): Editor | null {
  const savedState = localStorage.getItem('editorState')

  if (savedState) {
    const editorData = JSON.parse(savedState)

    const ajv = new Ajv()
    addFormats(ajv)
    const validate = ajv.compile(presentationSchema)

    if (!validate(editorData)) {
      console.error('Validation errors:', validate.errors)
      return null
    }

    return editorData as Editor
  }

  return null
}

function clearAllLocalStorage() {
  console.log('clear')
  localStorage.clear();
}

export {
  saveLocalStorage,
  loadLocalStorage,
  clearAllLocalStorage
}

*/