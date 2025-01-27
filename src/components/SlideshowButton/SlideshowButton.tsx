import styles from './SlideshowButton.module.css'
import { Link } from 'react-router'

type SlideshowButtonProps = {
  text: string,
  isClicked?: boolean,
  icon?: string,
  link: string,
}

function SlideshowButton({ text, isClicked, icon, link }: SlideshowButtonProps) {
  return (
    <Link
      to={link}
      className={`${styles.button} ${isClicked ? styles.clicked : ''}`}
    >
      <div className={styles.image}>
        {icon && <img src={icon} alt={text} className={styles.icon} />}
        {text}
      </div>
    </Link>
  )
}



export {
  SlideshowButton
}