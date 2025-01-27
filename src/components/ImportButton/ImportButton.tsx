import styles from './ImportButton.module.css'
import React from 'react'

type ImportButtonProps = {
  label: string;
  type: string;
  icon?: string;
  alt?: string;
  className?: string;
  inputId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ label, type, inputId, icon, alt, onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  const onInputButton = () => {
    document.getElementById(inputId)?.click()
  }

  return (
    <a
    className={styles.button}
    onClick={onInputButton}
    >
      {icon && <img className={styles.icon} src={icon} alt={alt}/>}
      <input
      type={type}
      id={inputId}
      className={styles.input}
      onChange={handleFileChange}
      />
      <label 
      htmlFor={inputId}
      className={styles.label}
      >
      <span className={styles.text}>{label}</span>
      </label>
    </a>
  )
}

export {
  ImportButton
}