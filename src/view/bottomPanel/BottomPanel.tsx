import styles from './BottomPanel.module.css'
import { SlideList } from '../slideList/SlideList'
import { Workspace } from '../workspace/Workspace'
import { SlideListButton } from "../../components/SlideListButton/SlideListButton.tsx"
import { addSlide, deleteSlide } from '../../store/redux/slideActionCreators.ts'
import { useDispatch } from 'react-redux'

function BottomPanel() {
  const dispatch = useDispatch();

  const handleAddSlide = () => {
    dispatch(addSlide());
  };

  const handleDeleteSlide = () => {
    dispatch(deleteSlide());
  };

  return (
    <div className={styles.bottomPanel}>
      <div className={styles.slideList}>
        <SlideListButton
          text={'+ Add slide'}
          onClick={handleAddSlide}
        />
        <SlideListButton
          text={'Delete slide'}
          onClick={handleDeleteSlide}
        />
        <SlideList
        />
      </div>
      <Workspace
        isSlideshow={false}
      />
    </div>
  )
}

export { BottomPanel }