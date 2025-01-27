import styles from './ExportButton.module.css'
import React from 'react'

type ExportButtonProps = {
  label: string;
  icon?: string;
  alt?: string;
  className?: string;
  href?: string;
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ label, icon, onClick, href, alt }) => {
  return (
    <a
    className={styles.button}
    onClick={onClick}
    href={href}
    >
      {icon && <img className={styles.icon} src={icon} alt={alt}/>}
      <span className={styles.text}>{label}</span>
    </a>
  )
}

export {
  ExportButton
}