/*import { useRef, useEffect } from 'react'
import { Slide } from "../Slide/Slide"
import { Slide as SlideType, Editor } from "../../store/type"
//import { useDragAndDrop } from "../../hooks/useDragAndDrop"
import { changeSlideIndex } from "../../store/functions"
import styles from "../DraggableSlide/DraggableSlide.module.css"

const preview_scale = 0.2

type DraggableSlideProps = {
  editor: Editor;
  onClick: () => void;
  slide: SlideType;
}

function DraggableSlide({ editor, slide, onClick }: DraggableSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null)
  const gap = 30
  const index = editor.presentation.slides.findIndex((s) => s.id === slide.id)
  const height = slideRef.current ? slideRef.current.getBoundingClientRect().height : 0
  const indexPositionY = (height + gap) * index

  //useDragAndDrop(slideRef, slidePosition, slide.id)

  useEffect(() => {
    const delta = slide.position ? slide.position.y - indexPositionY: 0
    let targetIndex = index

    if (delta > height + gap) {
      targetIndex = targetIndex + 1
    } else if (delta < (height + gap) / 2) {
      targetIndex = targetIndex - 1
    }

    if (
      targetIndex !== index && 
      targetIndex >= 0 && targetIndex < editor.presentation.slides.length
    ) {
      dispatch(changeSlideIndex, {
        slideId: slide.id,
        positionToMove: targetIndex,
      })
    }
  }, [
    slide.position, index, height, indexPositionY, editor.presentation.slides.length
  ])

  return (
    <div 
    className={styles.draggableSlide}
    ref={slideRef}
    onClick={onClick}
    style={{ 
      position: slide.position ? 'absolute' : 'static',
      top: slide.position ? `${slide.position.y}px` : 'auto',
      left: slide.position ? `${slide.position.x}px` : 'auto',
      height: `${height}px`
    }}
    >
      <Slide
            slide={slide}
            isSelected={slide.id === editor.selection.selectedSlides}
            scale={preview_scale}
      >
      </Slide>
    </div>

  )

}

export { DraggableSlide }*/