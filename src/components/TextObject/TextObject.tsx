import { TextObject } from '../../store/type'
import { CSSProperties, useState, useEffect, useRef } from 'react'
import styles from './TextObject.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResize } from '../../hooks/useResize'

type TextObjectProps = {
  textObject: TextObject,
  scale?: number
}

function Text({ textObject, scale = 1 }: TextObjectProps) {
  const selectedObjectsIds = useAppSelector((editor => editor.selection.selectedObjects))
  const { setSelection, deselectSelection, editTextObject } = useAppActions()

  const isSelected = selectedObjectsIds.includes(textObject.id)

  const [editedValue, setEditedValue] = useState(textObject.value)
  const [isEditing, setIsEditing] = useState(false)

  const textRef = useDragAndDrop(textObject.id)

  const resizeDirection = useRef<'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right'>('top-left')
  
  useResize(textObject.id, textRef, resizeDirection.current)

  const handleMouseDown = (direction: 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right') => (e: React.MouseEvent) => {
    e.stopPropagation()
    resizeDirection.current = direction
  }

  const textObjectStyles: CSSProperties = {
    color: `${textObject.textColor}`,
    fontFamily: textObject.fontFamily,
    fontSize: `${textObject.fontSize * scale}px`,
    left: (textObject.position.x * scale) + 'px',
    top: (textObject.position.y * scale) + 'px',
    width: (textObject.size.width * scale) + 'px',
    height: (textObject.size.height * scale) + 'px',
    border: isSelected ? '2px solid #6535E6' : '',
    display: 'inline-block',
    position: 'absolute',
  }

  const handleClick = () => {
    if (isSelected) {
      setIsEditing(true);
    } else {
      deselectSelection({ type: 'object' });
      setSelection({ type: 'object' }, { id: textObject.id })
    }
  }
  const onTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setEditedValue(value)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      editTextObject(editedValue, textObject.fontSize, textObject.textColor)
    }
    setIsEditing(false)
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.width = `${textRef.current.scrollWidth}px`;
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [editedValue]);


  return (
    <div
      className={styles.textObject}
      style={textObjectStyles}
      onClick={handleClick}
      ref={textRef}
    >
      {isSelected && isEditing ? (
        <input
          className={styles.input}
          type="text"
          value={editedValue}
          onChange={onTextChange}
          onBlur={handleEditToggle}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEditToggle()
              e.preventDefault()
            }
          }}
        />
      ) : (
        <span>{textObject.value}</span>
      )}

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

export { Text }

/*import {TextObject} from '../../store/type'
import { CSSProperties } from 'react'
import styles from './TextObject.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
//import { useDragAndDrop } from '../../hooks/useDragAndDrop'


type TextObjectProps = {
  textObject: TextObject,
  scale?: number
}

function Text({ textObject, scale = 1 }: TextObjectProps) {
  const ref = useRef<HTMLDivElement>(null); // Создаем реф для элемента
  const parentRef = useRef<HTMLDivElement>(null); // Создаем реф для родительского элемента (если требуется)
  // Используем хук для перетаскивания
  const position = useDragAndDrop(ref, parentRef, (delta) => {
    // Обработка изменения позиции
    console.log('New position:', delta);
    // Здесь вы можете вызвать функцию для обновления состояния или отправить данные в Redux
  });
  const selectedObjectsIds = useAppSelector((editor => editor.selection.selectedObjects));
  const { setSelection, deselectSelection } = useAppActions();

  //const isSelected = selectedSlideId.includes(imageObject.id) || selectedSlideId === imageObject.id;

  const isSelected = selectedObjectsIds.includes(textObject.id);

  const textObjectStyles: CSSProperties = {
    color: `${textObject.textColor}`,
    fontSize: `${textObject.fontSize * scale}px`,
    width: `${textObject.size.width * scale}px`,
    height: `${textObject.size.height * scale}px`,
    border: isSelected ? '2px solid #6535E6' : '',
  }

  const handleClick = () => {

    if (isSelected) {
      deselectSelection({ type: 'object' });
    } else {
      deselectSelection({ type: 'object' });
      setSelection({ type: 'object' }, { id: textObject.id });
    }
  }

  return (
    <div 
    ref={ref}
    className={styles.textObject}
    style={{ ...textObjectStyles, transform: `translate(${position?.x}px, ${position?.y}px)` }}
    onClick={() => dispatch(selectObject, { id: textObject.id})}
    className={styles.textObject}
    style={ textObjectStyles }
    onClick={handleClick}
    >
      {textObject.value}
    </div>
  )
}

export { Text } */