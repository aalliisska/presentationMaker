import { CSSProperties } from 'react';
import { Background, TextObject as TextObjectType, ImageObject as ImageObjectType, FigureObject as FigureObjectType, Slide as SlideType } from '../../store/type';
import { Text } from '../TextObject/TextObject';
import { Image } from '../ImageObject/ImageObject';
import styles from './Slide.module.css';
import { useAppActions } from '../../hooks/useAppActions';
import { useAppSelector } from '../../hooks/useAppSelector';

type SlideProps = {
  slide: SlideType
  scale?: number
}

function Slide({ slide, scale = 1 }: SlideProps) {
  //const slides = useAppSelector(editor => editor.presentation.slides)
  //const slideId = useAppSelector(editor => editor.selection.selectedSlides)
  //const slide = useAppSelector(editor => editor.presentation.slides.find(s => s.id === slideId));

  function setBackground(background: Background): string {
    if (background.type === 'solid') return background.color;
    if (background.type === 'image') return `url(${background.src})`;
    return '';
  }

  const style: CSSProperties = slide ? { background: setBackground(slide.background), } : {};

  const selectedSlideId = useAppSelector((editor) => editor.selection.selectedSlides)
  const { deselectSelection } = useAppActions();

  const handleClick = () => {
    if (slide.id !== selectedSlideId) {
      deselectSelection({ type: 'object' });
    }
  };


  return (
    <div
      className={styles.slide}
      style={style}
      onClick={handleClick}
    >
      {slide ? (
        slide.contentObjects.map((slideObject: TextObjectType | ImageObjectType | FigureObjectType) => {
          if (slideObject.type === 'text') {
            return (
              <Text
                key={slideObject.id}
                textObject={slideObject}
                scale={scale}
              />
            );
          } else if (slideObject.type === 'image') {
            return (
              <Image
                key={slideObject.id}
                imageObject={slideObject}
                scale={scale}
              />
            );
          } else if (slideObject.type === 'figure') {
            return null;
          } else {
            return null;
          }
        })
      ) : (
        <div>Слайд не найден</div>
      )}
    </div>
  );
}

export { Slide };
