import styles from "./SlideList.module.css"
import { SlideListPreview } from "./SlideListPreview.tsx"
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
//import { DraggableSlide } from '../../components/DraggableSlide/DraggableSlide.tsx'

function SlideList() {
  const slides = useAppSelector((editor => editor.presentation.slides))
  const { setSelection } = useAppActions()

  //const parentRef = useRef<HTMLDivElement>(null);

  
  return (
    <div className={styles.SlideList}>
      {slides.map((slide, index) => (
        <SlideListPreview
          key={slide.id}
          slide={slide}
          index={index} // Передаем индекс
          totalSlides={slides.length} // Передаем общее количество слайдов
          onClick={() => setSelection({
            type: 'slide'
          },
            { id: slide.id },
          )}
        />
      ))}
    </div>
  )
}

export { SlideList }


/*import styles from "./SlideList.module.css"
import { SlideListPreview } from "./SlideListPreview.tsx"
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppActions } from '../../hooks/useAppActions'
//import { DraggableSlide } from '../../components/DraggableSlide/DraggableSlide.tsx'

function SlideList() {
  const slides = useAppSelector((editor => editor.presentation.slides))
  const { setSelection } = useAppActions()

  //const parentRef = useRef<HTMLDivElement>(null);

  
  return (
    <div className={styles.SlideList}>
      {slides.map((slide) => (
        <SlideListPreview
          key={slide.id}
          slide={slide}
          onClick={() => setSelection({
            type: 'slide'
          },
            { id: slide.id },
          )}
        />
      ))}
    </div>
  )
}

export { SlideList }*/


/* import { useEffect, useState, useRef } from 'react'
import styles from "./SlideList.module.css"
import { selectSlide } from "../../store/functions.ts"
import { dispatch } from "../../store/editor.ts"
import { Editor, Selection, Slide as SlideType } from '../../store/type.ts'
import { Slide } from '../../components/Slide/Slide.tsx'
//import { DraggableSlide } from '../../components/DraggableSlide/DraggableSlide.tsx'

const preview_scale = 0.2

type SlideListProps = {
  editor: Editor,
  slideList: SlideType[],
  selection: Selection
}

function SlideList({ editor, slideList }: SlideListProps) {
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

  // Выделение первого слайда по умолчанию
  useEffect(() => {
    if (!initialized && slideList.length > 0) {
      setSelectedSlideId(slideList[0].id);
      dispatch(selectSlide, { id: slideList[0].id });
      setInitialized(true);
    }
  }, [slideList, initialized]);

  return (
      <div className={styles.SlideList}>
        {slideList.map((slide) => (
            <div
                className={styles.shell}
                key={slide.id}
                onClick={() => {
                  if (selectedSlideId !== slide.id) {
                    setSelectedSlideId(slide.id);
                    dispatch(selectSlide, { id: slide.id });
                  }
                }}
                ref={parentRef}
            >
              <Slide
                  editor={editor}
                  slide={slide}
                  selection={slide.id === selectedSlideId}
                  scale={preview_scale}
              />
            </div>
        ))}
      </div>
  );
}

export { SlideList };
*/