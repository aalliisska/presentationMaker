import { Slide } from '../../components/Slide/Slide'
import { Slide as SlideType } from '../../store/type'
import styles from './SlideListPreview.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

const preview_scale = 0.2

type SlideListPreviewProps = {
  onClick: () => void
  slide: SlideType
  index: number
  totalSlides: number
}

function SlideListPreview({ onClick, slide, index, totalSlides }: SlideListPreviewProps) {
  //const slides = useAppSelector((editor => editor.presentation.slides))

  const selectedSlideId = useAppSelector((editor) => editor.selection.selectedSlides)
  //const { setSelection } = useAppActions()

  const isSelected = slide.id === selectedSlideId;

  const style = {
    border: isSelected ? '2px solid #6535E6' : '',
  }

  const targetRef = useDragAndDrop(slide.id, index, totalSlides);

  return (
    <div
      className={styles.preview}
      onClick={onClick}
      style={style}
      ref={targetRef}
    >
      <Slide
        slide={slide}
        scale={preview_scale}
      ></Slide>
    </div>
  )
}

export { SlideListPreview }

/*import { Slide } from '../../components/Slide/Slide'
import { Slide as SlideType } from '../../store/type'
import styles from './SlideListPreview.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

const preview_scale = 0.2

type SlideListPreviewProps = {
  onClick: () => void
  slide: SlideType
}

function SlideListPreview({ onClick, slide }: SlideListPreviewProps) {
  //const slides = useAppSelector((editor => editor.presentation.slides))

  const selectedSlideId = useAppSelector((editor) => editor.selection.selectedSlides)
  //const { setSelection } = useAppActions()

  const isSelected = slide.id === selectedSlideId;

  const style = {
    border: isSelected ? '2px solid #6535E6' : '',
  }

  const targetRef = useDragAndDrop(slide.id);

  return (
    <div
      className={styles.preview}
      onClick={onClick}
      style={style}
      ref={targetRef}
    >
      <Slide
        slide={slide}
        scale={preview_scale}
      ></Slide>
    </div>
  )
}

export { SlideListPreview }*/