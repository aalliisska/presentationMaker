import * as SlideActionCreators from './slideActionCreators'
import * as EditorActionCreators from './editorActionCreators'
import * as SelectionActionCreators from './selectionActionCreators'

export default {
  ...SlideActionCreators,
  ...EditorActionCreators,
  ...SelectionActionCreators
}