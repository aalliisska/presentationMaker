import styles from './SlideListButton.module.css'
import React from 'react'

type SlideListButtonProps = {
  text: string,
  onClick: () => void,
}

const SlideListButton: React.FC<SlideListButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}>
      {text}
    </button>
  )
}

export {
  SlideListButton
}