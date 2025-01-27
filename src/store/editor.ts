/*
import { v4 as uuidv4 } from 'uuid';
import { saveLocalStorage, loadLocalStorage, clearAllLocalStorage } from "./localStorage";
import { setDefaultBackground } from "./functions";

const slides: Slide[] = [
  {
    id: uuidv4(),
    contentObjects: [],
    background: setDefaultBackground(),
    position: null
  },
  {
    id: uuidv4(),
    contentObjects: [],
    background: setDefaultBackground(),
    position: null
  }
];

const newPresentation: Presentation = {
  title: 'Presentation title',
  slides: slides
};

let editor: Editor = {
  presentation: newPresentation,
  selection: {
    selectedSlides: slides.length > 0 ? slides[0].id : '',
    selectedObjects: [],
  }
};

const editorState = loadLocalStorage() || editor;
let _editor: Editor = editorState;

let editorChangeHandler: Function | null = null;

function getEditor() {
  return _editor;
}

function isEqual<T>(value: T, other: T): boolean {
  if (value === other) return true;
  if (typeof value !== 'object' || typeof other !== 'object') return false;
  if (value === null || other === null) return false;

  const keysA = Object.keys(value) as Array<keyof T>;
  const keysB = Object.keys(other) as Array<keyof T>;
  
  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !isEqual(value[key], other[key])) {
      return false;
    }
  }
  
  return true;
}

function setEditor(newEditor: Editor) {
  if (!isEqual(_editor, newEditor)) {
    _editor = newEditor;
    saveLocalStorage();
  }
  /*window.onbeforeunload = function() {
    clearAllLocalStorage()
  };
}

function addEditorChangeHandler(handler: Function) {
  editorChangeHandler = handler;
}

function dispatch(modifyFn: Function, payload?: object | string | undefined): void {
  const newEditor = modifyFn(_editor, payload);
  setEditor(newEditor);

  if (editorChangeHandler) {
    editorChangeHandler();
  }
}

export {
  getEditor,
  setEditor,
  dispatch,
  addEditorChangeHandler,
  editor,
};
*/