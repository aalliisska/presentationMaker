import { ImageObject } from '../../store/type'
import { CSSProperties, useRef, useEffect } from 'react'
import styles from './ImageObject.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResize } from '../../hooks/useResize'

type ImageObjectProps = {
  imageObject: ImageObject;
  scale?: number;
}

function Image({ imageObject, scale = 1 }: ImageObjectProps) {
  const selectedObjectsIds = useAppSelector((editor) => editor.selection.selectedObjects)
  const { setSelection, deselectSelection } = useAppActions()
  const isSelected = selectedObjectsIds.includes(imageObject.id)

  const imageObjectStyles: CSSProperties = {
    left: (imageObject.position.x * scale) + 'px',
    top: (imageObject.position.y * scale) + 'px',
    width: (imageObject.size.width * scale) + 'px',
    height: (imageObject.size.height * scale) + 'px',
    backgroundImage: `url(${imageObject.src})`,
    backgroundSize: 'cover',
    border: isSelected ? '2px solid #6535E6' : '',
    position: 'absolute',
  }

  const handleClick = () => {
    if (isSelected) {
      deselectSelection({ type: 'object' })
    } else {
      deselectSelection({ type: 'object' })
      setSelection({ type: 'object' }, { id: imageObject.id })
    }
  };

  const ref = useDragAndDrop(imageObject.id)

  const resizeDirection = useRef<'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'>('top-left')
  
  useResize(imageObject.id, ref, resizeDirection.current)

  const handleMouseDown = (direction: 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right') => (e: React.MouseEvent) => {
    e.stopPropagation()
    resizeDirection.current = direction
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isSelected) {
        deselectSelection({ type: 'object' });
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelected, deselectSelection])


  return (
    <div
      ref={ref}
      className={`${styles.imageObject} ${isSelected ? styles.selected : ''}`}
      style={imageObjectStyles}
      onClick={handleClick}
    >
      <div style={{ cursor: 'nwse-resize', position: 'absolute', top: '-5px', left: '-5px', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('top-left')} />
      <div style={{ cursor: 'ns-resize', position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('top')} />
      <div style={{ cursor: 'nesw-resize', position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('top-right')} />
      <div style={{ cursor: 'ew-resize', position: 'absolute', top: '50%', left: '-5px', transform: 'translateY(-50%)', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('left')} />
      <div style={{ cursor: 'ew-resize', position: 'absolute', top: '50%', right: '-5px', transform: 'translateY(-50%)', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('right')} />
      <div style={{ cursor: 'nwse-resize', position: 'absolute', bottom: '-5px', left: '-5px', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('bottom-left')} />
      <div style={{ cursor: 'ns-resize', position: 'absolute', bottom: '-5px', transform: 'translateX(-50%)', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('bottom')} />
      <div style={{ cursor: 'nws-e-resize', position: 'absolute', bottom: '-5px', right: '-5px', width: '10px', height: '10px' }}
        onMouseDown={handleMouseDown('bottom-right')} />

    </div>
  )
}

export { Image }

/*import { ImageObject } from '../../store/type'
import { CSSProperties } from 'react'
import styles from './ImageObject.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResize } from '../../hooks/useResize'
//import { useDispatch } from 'react-redux'
//import { changeObjectPosition } from '../../store/redux/slideActionCreators'

type ImageObjectProps = {
  imageObject: ImageObject,
  scale?: number
}

function Image({ imageObject, scale = 1 }: ImageObjectProps) {
  //const dispatch = useDispatch(); 
  //const ref = useRef<HTMLDivElement>(null)
  //const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlides))
  const selectedObjectsIds = useAppSelector((editor => editor.selection.selectedObjects))
  const { setSelection, deselectSelection } = useAppActions()
  const isSelected = selectedObjectsIds.includes(imageObject.id)


  const imageObjectStyles: CSSProperties = {
    left: imageObject.position.x / scale,
    top: imageObject.position.y / scale,
    width: `${(imageObject.size.width as number) * scale}px`,
    height: `${(imageObject.size.width as number) * scale}px`,
    backgroundImage: `url(${imageObject.src})`,
    backgroundSize: 'cover',
    border: isSelected ? '2px solid #6535E6' : '',
    position: 'absolute'
  }

  const handleClick = () => {
    if (isSelected) {
      deselectSelection({ type: 'object' });
    } else {
      deselectSelection({ type: 'object' });
      setSelection({ type: 'object' }, { id: imageObject.id });
    }
  };

  const ref = useDragAndDrop(imageObject.id)
  useResize(ref)

  return (
    <div
      ref={ref}
      className={`${styles.imageObject} ${isSelected ? styles.selected : ''}`}
      style={imageObjectStyles}
      onClick={handleClick}
    >
    </div>
  )
}

export { Image } */


/*import { ImageObject } from '../../store/type'
import { CSSProperties, } from 'react'
import styles from './ImageObject.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
//import { useDragAndDrop } from '../../hooks/useDragAndDrop'


type ImageObjectProps = {
  imageObject: ImageObject,
  scale?: number
}

function Image({ imageObject, scale = 1 }: ImageObjectProps) {
  //const { ref, position } = useDragAndDrop()

  const selectedSlideId = useAppSelector((editor => editor.selection.selectedSlides))
  const { setSelection, deselectSelection } = useAppActions()

  const isSelected = selectedSlideId.includes(imageObject.id);

  console.log(`Is selected: ${isSelected}`);

  const imageObjectStyles: CSSProperties = {
    left: imageObject.position.x / scale,
    top: imageObject.position.y / scale,
    width: `${imageObject.size.width * scale}px`,
    height: `${imageObject.size.height * scale}px`,
    backgroundImage: `url(${imageObject.src})`,
    backgroundSize: 'cover',
    //border: isSelected ? '2px solid #6535E6' : '',
  }

  const handleClick = (event: React.MouseEvent) => {
    console.log(`Clicked on object with ID: ${imageObject.id}`);

    if (event.ctrlKey || event.shiftKey) {
      // Если удерживается Ctrl или Shift, переключаем состояние выделения
      if (isSelected) {
        console.log(`Deselecting object with ID: ${imageObject.id}`);
        deselectSelection({ type: 'object' });
      } else {
        console.log(`Selecting object with ID: ${imageObject.id}`);
        setSelection({ type: 'object' }, { id: imageObject.id });
      }
    } else {
      // Если не удерживается ни одна из клавиш, снимаем выделение со всех и выбираем текущий
      console.log(`Selecting object with ID: ${imageObject.id}`);
      deselectSelection({ type: 'object' });
      setSelection({ type: 'object' }, { id: imageObject.id });
    }
  };


  return (
    <div
      className={`${styles.imageObject} ${isSelected ? styles.selected : ''}`}
      style={imageObjectStyles}
      onClick={handleClick}
    >
    </div>
  )
}

export { Image }*/

/*import { ImageObject } from '../../store/type'
import { CSSProperties } from 'react'
import { selectObject } from '../../store/functions'
import styles from './ImageObject.module.css'
import { dispatch } from '../../store/editor'
//import { useDragAndDrop } from '../../hooks/useDragAndDrop'


type ImageObjectProps = {
  imageObject: ImageObject,
  selection: boolean,
  scale?: number
}

function Image({ imageObject, selection, scale = 1 }: ImageObjectProps) {
  //const { ref, position } = useDragAndDrop()

  const imageObjectStyles: CSSProperties = {
    left: imageObject.position.x / scale,
    top: imageObject.position.y / scale,
    width: `${imageObject.size.width * scale}px`,
    height: `${imageObject.size.height * scale}px`,
    backgroundImage: `url(${imageObject.src})`,
    backgroundSize: 'cover',
    border: selection ? '2px solid #6535E6' : '',
  }

  return (
    <div
      /*ref={ref}
      className={styles.imageObject}
      style={{ ...imageObjectStyles, transform: `translate(${position.x}px, ${position.y}px)` }}
      onClick={() => dispatch(selectObject, { id: imageObject.id })}
      className={styles.imageObject}
      style={{ ...imageObjectStyles}}
      onClick={() => dispatch(selectObject, { id: imageObject.id })}
    >
    </div>
  )
}

export { Image } */