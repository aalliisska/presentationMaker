import styles from './FontSizeButton.module.css'
import { useState } from 'react';

type FontSizeButtonProps = {
  text?: string,
  onClick: (fontSize: number) => void,
  isClicked?: boolean,
  disabled?: boolean,
  className?: string,
}

function FontSizeButton({ text, onClick, isClicked, disabled, className }: FontSizeButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [fontSize, setFontSize] = useState<number | ''>(14)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^[0-9]*$/.test(value)) {
      setFontSize(value === '' ? '' : Number(value))
    }
  };

  const handleButtonClick = () => {
    if (fontSize !== '') {
      onClick(Number(fontSize))
    }
  };


  return (
    <button
      onClick={handleButtonClick}
      className={`${styles.button} ${isClicked ? styles.clicked : ''} ${className}`}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.putsize}>
        {isHovered ? (
          <input
            type="text"
            value={fontSize === '' ? '' : fontSize}
            onChange={handleInputChange}
            className={styles.input} />
        ) : (
          <input
            type="text"
            value={fontSize === '' ? '' : fontSize}
            onChange={handleInputChange}
            className={styles.input} />
        )}
        {text}
      </div>
    </button>
  )
}

export {
  FontSizeButton
}