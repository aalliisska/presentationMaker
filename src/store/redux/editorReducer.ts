import { defaultEditor } from "../presentationData"
import { Editor } from "../type"
import { ActionType, EditorAction } from "./action"
import { addSlide, deleteSlide, setSelection, deselectSelection, addText, deleteObject, renamePresentationTitle, changeSlideIndex, objectPosition, changeObjectSize, changeBackground, editTextObject, changeFontSize, changeFontFamily, changeFontColor } from "../functions"

function editorReducer(editor: Editor = defaultEditor, action: EditorAction): Editor {
  console.log(action)
  switch (action.type) {
    case ActionType.ADD_SLIDE:
      return addSlide(editor)
    case ActionType.DELETE_SLIDE:
      return deleteSlide(editor)
    case ActionType.CHANGE_SLIDE_INDEX:
      return changeSlideIndex(editor, action)
    case ActionType.SET_SELECTION:
      return setSelection(editor, action)
    case ActionType.DESELECT_SELECTION:
      return deselectSelection(editor, action)
    case ActionType.SET_EDITOR:
      return { ...action.payload }
    case ActionType.ADD_TEXT:
      return addText(editor)
    case ActionType.EDIT_TEXT_OBJECT:
      return editTextObject(editor, action.payload.newValue, action.payload.fontSize, action.payload.textColor)
    case ActionType.CHANGE_FONT_SIZE:
      return changeFontSize(editor, action.payload.newSize)
    case ActionType.CHANGE_FONT_FAMILY:
      return changeFontFamily(editor, action.payload.newFontFamily)
    case ActionType.CHANGE_FONT_COLOR:
      return changeFontColor(editor, action.payload.newFontColor)
    case ActionType.ADD_IMAGE:
      const newImageObject = action.payload;

      const updatedSlides = editor.presentation.slides.map(slide =>
        slide.id === editor.selection.selectedSlides
          ? {
            ...slide,
            contentObjects: [...slide.contentObjects, newImageObject],
          }
          : slide
      );

      return {
        ...editor,
        presentation: {
          ...editor.presentation,
          slides: updatedSlides,
        },
      };
    case ActionType.DELETE_OBJECT:
      return deleteObject(editor)
    case ActionType.CHANGE_BACKGROUND:
      return changeBackground(editor, action)
    case ActionType.RENAME_PRESENTATION_TITLE:
      return renamePresentationTitle(editor, action)
    case ActionType.CHANGE_OBJECT_POSITION:
      console.log('Reducer received action:', action);
      const updatedEditor = objectPosition(editor, action);
      console.log('Updated editor state:', updatedEditor);
      return updatedEditor;
    case ActionType.CHANGE_OBJECT_SIZE:
      return changeObjectSize(editor, action)
    case ActionType.SET_EDITOR:
      return action.payload
    default:
      return editor
  }
}

export { editorReducer }