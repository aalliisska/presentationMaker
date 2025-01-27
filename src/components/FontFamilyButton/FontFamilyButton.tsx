import styles from './FontFamilyButton.module.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFontFamily } from '../../store/redux/slideActionCreators'

const FontFamilyButton = () => {
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFontFamily = event.target.value
    dispatch(changeFontFamily(selectedFontFamily))
  }

  return (
    <select className={styles.select} onChange={handleChange} defaultValue="Roboto">
      <option value="Roboto">Roboto</option>
      <option value="Caveat">Caveat</option>
      <option value="Open Sans">Open Sans</option>
      
    </select>
  )
}

export {FontFamilyButton}
