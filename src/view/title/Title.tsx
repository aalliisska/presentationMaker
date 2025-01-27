import { useAppActions } from '../../hooks/useAppActions'
import { useAppSelector } from '../../hooks/useAppSelector'
import styles from './Title.module.css'


function Title() {
  const { renamePresentationTitle } = useAppActions()
  const onTitleSlide: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = (event.target as HTMLInputElement).value
    renamePresentationTitle(value)
  }
  const title = useAppSelector(editor => editor.presentation.title)

  return (
    <input 
    className={styles.title} 
    type="text" 
    value={title ?? 'Presentation title'}
    onChange={onTitleSlide}
    />
  )
}

export { Title }