//import { WorkSpace } from '../../components/WorkSpace/WorkSpace' 
import { Slide } from '../../components/Slide/Slide'
import styles from './WorkSpace.module.css'
//import { useAppActions } from '../../hooks/useAppActions'
import { useAppSelector } from '../../hooks/useAppSelector'

type WorkspaceProps = {
  isSlideshow: boolean;
  className?: string;
}

function Workspace({ isSlideshow, className }: WorkspaceProps) {
  const slides = useAppSelector(editor => editor.presentation.slides)
  const selectedSlideId = useAppSelector(editor => editor.selection.selectedSlides)
  //const { deselectSelection } = useAppActions()
  const slide = slides.find((slide) => slide.id === selectedSlideId)!
  return slide ? (
    <div className={`${styles.workspace} ${className} ${isSlideshow ? styles.slideshow : ''}`}
    /*onClick={
      (e) => {
        if (e.defaultPrevented) return
        deselectSelection({type: 'object'})
        e.preventDefault()
      }
    }*/
    >
      {
        slide ?
          <
            Slide slide={slide}
          />
          : ''
      }
    </div>
  ) : (
    <div className={styles.space}>
    </div>
  )
}

export { Workspace }

/* import styles from "./Workspace.module.css"
import { dispatch } from "../../store/editor.ts"
import { deselectObjects } from '../../store/functions.ts'
import { Editor } from '../../store/type.ts'
import { WorkSpace } from '../../components/WorkSpace/WorkSpace.tsx'

type WorkspaceProps = {
  editor: Editor
}

function Workspace({ editor }: WorkspaceProps) {

  const slide = editor.presentation.slides.find(
    (slide) => slide.id === editor.selection.selectedSlides
  )
  return slide ? (

    <div className={styles.space} onMouseDown={
      () => dispatch(deselectObjects)}>
      <WorkSpace editor={editor} slide={slide}></WorkSpace>
    </div>
  ) : (
    <div className={styles.space}></div>
  )
}

export { Workspace } */