import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { editorReducer } from './editorReducer'
import { loadLocalStorage, saveLocalStorage } from '../localStorage'

const localStorageData = loadLocalStorage()

const store = createStore(
  editorReducer, 
  localStorageData || undefined,
  applyMiddleware(saveLocalStorage)
)
export { store }