import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { loadLocalStorage } from './store/localStorage.tsx'
import { Provider } from 'react-redux'
import { store } from './store/redux/store.ts'
import { setEditor } from './store/redux/editorActionCreators.ts'
import { initHistory } from './utils/history.ts'

const editorLocalStorage = () => {
    const savedState = loadLocalStorage()
    if (savedState) {
        setEditor(savedState)
    }
}

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <Provider store={store}>
                <App history={initHistory(store)}/>
            </Provider>
        </StrictMode>
    )
}

editorLocalStorage()
render()


/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {addEditorChangeHandler, getEditor} from "./store/editor.ts";

const root = createRoot(document.getElementById('root')!)
function render() {
    root.render(
        <StrictMode>
            <App editor={getEditor()}/>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()*/

/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {addEditorChangeHandler} from "./store/editor.ts"
import { loadLocalStorage } from './store/localStorage.tsx'
import { editor } from './store/editor.ts'

const root = createRoot(document.getElementById('root')!)
function render() {
    const editorLocalStorage = loadLocalStorage()
    root.render(
        <StrictMode>
            <App editor={editorLocalStorage !== null ? editorLocalStorage : editor}/>
        </StrictMode>,
    )
}

addEditorChangeHandler(render)
render()

export {
    render
} */