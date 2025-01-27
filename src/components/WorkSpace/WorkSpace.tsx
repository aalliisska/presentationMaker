/*import { Slide } from '../../components/Slide/Slide'
import styles from './WorkSpace.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'

function WorkSpace() {
  const slides = useAppSelector(editor => editor.presentation.slides)
  const slideId = useAppSelector(editor => editor.selection.selectedSlides)
  const slide = slides.find((slide) => slide.id === slideId)
  return (
    <div className={styles.workspace}>
    {
      slide ? <Slide slide={slide}/> : ''
    }
    </div>
  ) 
}

export { WorkSpace }*/