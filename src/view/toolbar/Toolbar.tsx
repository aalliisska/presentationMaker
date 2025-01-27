import styles from './Toolbar.module.css'
import React, { useEffect, useState } from 'react'
import { ToolbarButton } from '../../components/ToolbarButton/ToolbarButton.tsx'
import text from '../../assets/text.svg'
import image from '../../assets/image.svg'
import internet from '../../assets/internet.svg'
import trash from '../../assets/delete.svg'
import undo from '../../assets/undo.svg'
import redo from '../../assets/redo.svg'
import slideshow from '../../assets/slideshow.svg'
import { useAppSelector } from '../../hooks/useAppSelector.ts'
import { addImage, addText, deleteObject, changeBackground, changeFontSize } from "../../store/redux/slideActionCreators.ts"
import { useDispatch } from 'react-redux'
import { LoadImageButton } from '../../components/loadImageButton/loadImageButton.tsx'
import { HistoryContext } from '../../hooks/historyContext.ts'
import { setEditor } from '../../store/redux/editorActionCreators.ts'
import { SlideshowButton } from '../../components/SlideshowButton/SlideshowButton.tsx'
import { Popup } from '../../components/Popup/Popup.tsx'
import { FontSizeButton } from '../../components/FontSizeButton/FontSizeButton.tsx'
import { FontFamilyButton } from '../../components/FontFamilyButton/FontFamilyButton.tsx'
import { FontColorButton } from '../../components/FontColorButton/FontColorButton.tsx'
import { BackgroundButton } from '../../components/BackgroundButton/BackgroundButton.tsx'
//import { useAppActions } from '../../hooks/useAppActions.ts'


function Toolbar() {
  const dispatch = useDispatch();
  const slides = useAppSelector(editor => editor.presentation.slides)
  //const { setEditor } = useAppActions()
  const selectedSlideId = useAppSelector(editor => editor.selection.selectedSlides)
  const isSelected = slides.find((slide) => slide.id === selectedSlideId)
  const background = isSelected ? isSelected.background : null

  let value
  if (background?.type === 'solid') {
    value = background?.color
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeBackground({
      value: e.target.value,
      type: 'solid',
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, actionType: string) => {
    const target = event.target

    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      const reader = new FileReader()

      reader.onload = (loadEvent) => {
        const imageUrl = loadEvent.target?.result as string

        if (actionType === 'media') {
          console.log('Adding image to slide:', file)
          dispatch(addImage(file))
        } else if (actionType === 'download') {
          console.log('Setting background image:', imageUrl)
          dispatch(changeBackground({ type: 'image', value: imageUrl }))
        }

        target.value = ''
      }

      reader.readAsDataURL(file);
    } else {
      console.error("No file selected or invalid file type.")
    }
  }


  const history = React.useContext(HistoryContext)

  function onUndo() {
    const newEditor = history.undo()
    console.log(newEditor)

    if (newEditor) {
      console.log(setEditor)
      dispatch(setEditor(newEditor))
      console.log('wfdsc')
    }
  }

  function onRedo() {
    const newEditor = history.redo()
    //console.log(newEditor)

    if (newEditor) {
      //console.log(setEditor)
      dispatch(setEditor(newEditor))
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'z') {
        event.preventDefault()
        onUndo()
      }
      if (event.metaKey && event.key === 'y') {
        event.preventDefault()
        onRedo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [history])

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleUnsplashClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  return (
    <div>
      <div className={styles.toolbar}>
        <FontSizeButton
          isClicked={!isSelected}
          text={'Size'}
          onClick={(fontSize) => dispatch(changeFontSize(fontSize))}
        />
        <div className={styles.family}>
          <FontFamilyButton />
          <span className={styles.info}>Family</span>
        </div>
        <div className={styles.swatch}>
          <FontColorButton />
          <span className={styles.info}>Color</span>
        </div>
        <ToolbarButton
          isClicked={!isSelected}
          text={'Text'}
          onClick={() => dispatch(addText())}
          icon={text}
        />
        <label className={styles.imageOut} htmlFor='file-input'>
          <div className={styles.image}>
            <img src={image} alt={'Media'} className={styles.icon} /> Media
          </div>
        </label>
        <LoadImageButton onChange={(e) => handleImageUpload(e, 'media')} />
        <ToolbarButton
          isClicked={!isSelected}
          text={'Unsplash'}
          onClick={handleUnsplashClick}
          icon={internet}
        />
        <ToolbarButton
          isClicked={!isSelected}
          text={'Delete'}
          onClick={() => dispatch(deleteObject())}
          icon={trash}
        />
        <label className={styles.imageOut} htmlFor='background-file-input'>
          <div className={styles.image}>
            <img src={image} alt={'Download'} className={styles.icon} /> Download
          </div>
        </label>
        <BackgroundButton onChange={(e) => handleImageUpload(e, 'download')} />
        <div className={styles.swatch}>
          <input
            type='color'
            value={value ?? '#FFFFFF'}
            onChange={handleColorChange}
            className={styles.color}
          />
          <span className={styles.info}>Solid</span>
        </div>
        <div className={styles.arrows}>
          <ToolbarButton
            text={'Undo'}
            onClick={(onUndo)}
            icon={undo}
          />
          <ToolbarButton
            text={'Redo'}
            onClick={(onRedo)}
            icon={redo}
          />
          <SlideshowButton
            isClicked={!isSelected}
            text={'Slideshow'}
            icon={slideshow}
            link={'/slideshow'}
          />
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />

    </div>
  )

}

export { Toolbar }

/*import styles from "./Toolbar.module.css"
import { addText, addImage, addFigure, deleteObject, changeBackground, findSlide } from "../../store/functions.ts"
import { dispatch } from "../../store/editor.ts"
import { ToolbarButton } from "../../components/ToolbarButton/ToolbarButton.tsx"
import { Editor } from '../../store/type.ts'
import text from '../../assets/text.svg'
import image from '../../assets/image.svg'
import figure from '../../assets/figure.svg'
import trash from '../../assets/delete.svg'

type ToolbarProps = {
  editor: Editor
}

function Toolbar({ editor }: ToolbarProps) {
  const slides = editor.presentation.slides
  const slideId = editor.selection.selectedSlides
  const editSlide = findSlide(slides, slideId)
  const background = editSlide ? editSlide.background : null
  let value
  if (background?.type === 'solid') {
    value = background?.color
  }
  return (
    <div>
      <div className={styles.toolbar}>
        <ToolbarButton
          isClicked={!editor.selection.selectedSlides}
          text={'Text'}
          onClick={() => dispatch(addText)}
          icon={text}
        />
        <ToolbarButton
          isClicked={!editor.selection.selectedSlides}
          text={'Media'}
          onClick={() => dispatch(addImage)}
          icon={image}
        />
        <ToolbarButton
          isClicked={!editor.selection.selectedSlides}
          text={'Shape'}
          onClick={() => dispatch(addFigure)}
          icon={figure}
        />
        <ToolbarButton
          isClicked={!editor.selection.selectedSlides}
          text={'Delete'}
          onClick={() => dispatch(deleteObject)}
          icon={trash}
        />
        <div className={styles.swatch}>
          <input
            type='color'
            value={value ?? '#FFFFFF'}
            onChange={(e) =>
              dispatch(changeBackground, {
                value: e.target.value,
                type: 'solid'
              })
            }
            className={styles.color}
          />
          <span className={styles.info}>Solid</span>
        </div>
      </div>

    </div>
  )

}

export { Toolbar }
*/