
import { useState, useEffect } from 'react'
import styles from './Slideshow.module.css'
import { Workspace } from '../workspace/Workspace'
import { SlideshowButton } from '../../components/SlideshowButton/SlideshowButton'
import editor from '../../assets/editor.svg'
import next from '../../assets/next.svg'
import previous from '../../assets/previous.svg'
import nextGrey from '../../assets/nextGrey.svg'
import previousGrey from '../../assets/previousGrey.svg'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
import { useNavigate } from 'react-router'
import { ToolbarButton } from '../../components/ToolbarButton/ToolbarButton'

function Slideshow() {
  const slides = useAppSelector(editor => editor.presentation.slides)
  const selection = useAppSelector(editor => editor.selection)
  const { setSelection } = useAppActions()
  const navigate = useNavigate()

  const [currentSlideIndex, setCurrentSlideIndex] = useState(
    selection?.selectedSlides.length > 0
      ? slides.findIndex(slide => slide.id === selection.selectedSlides[0])
      : 0
  )

  const updatedSelection = (slideId: string) => {
    setSelection({ type: "slide" }, { id: slideId })
  }

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      const nextSlideIndex = (currentSlideIndex + 1) % slides.length
      setCurrentSlideIndex(nextSlideIndex)
      //console.log(nextSlideIndex)
      updatedSelection(slides[nextSlideIndex].id)
    }

  }

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      const previousSlideIndex = (currentSlideIndex - 1) % slides.length
      setCurrentSlideIndex(previousSlideIndex)
      //console.log(nextSlideIndex)
      updatedSelection(slides[previousSlideIndex].id)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        goToNextSlide()
        break
      case 'ArrowLeft':
        goToPreviousSlide()
        break
      case 'Enter':
        navigate('/')
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSlideIndex, slides])

  return (
    <div className={styles.slideshow}>
      <div className={styles.link}>
        <SlideshowButton
          text={'Edit back'}
          icon={editor}
          link={'/'}
        />
      </div>
      <div className={styles.workspace}>
      <ToolbarButton
          onClick={goToPreviousSlide} 
          disabled={currentSlideIndex === 0}
          icon={previousGrey}
          hoverIcon={previous}
          className={styles.button}
        />
        <Workspace
          isSlideshow={true}
          className={styles.space}
        />
        <ToolbarButton
          onClick={goToNextSlide} 
          disabled={currentSlideIndex === slides.length - 1}
          icon={nextGrey}
          hoverIcon={next}
          className={styles.button}
        />
      </div>
    </div>
  )
}

export { Slideshow }