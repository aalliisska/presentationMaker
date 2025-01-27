import styles from './ToolbarButton.module.css'
import { useState } from 'react';

type ToolbarButtonProps = {
  text?: string,
  onClick: () => void,
  isClicked?: boolean,
  icon?: string,
  hoverIcon?: string,
  disabled?: boolean,
  className?: string,
}

function ToolbarButton({ text, onClick, isClicked, icon, hoverIcon, disabled, className }: ToolbarButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${isClicked ? styles.clicked : ''} ${className}`}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.image}>
        {isHovered && hoverIcon ? (
          <img src={hoverIcon} alt={text} className={styles.icon} />
        ) : (
          icon && <img src={icon} alt={text} className={styles.icon} />
        )}
        {text}
      </div>
    </button>
  )
}

export {
  ToolbarButton
}