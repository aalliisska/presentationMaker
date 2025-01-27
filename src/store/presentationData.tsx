import { Editor, Presentation, Slide } from "./type";
import { v4 as uuidv4 } from 'uuid';
import { setDefaultBackground } from "./functions";

const slides: Slide[] = [
  {
    id: uuidv4(),
    contentObjects: [],
    background: setDefaultBackground(),
    position: null
  },
  {
    id: uuidv4(),
    contentObjects: [],
    background: setDefaultBackground(),
    position: null
  }
];

const newPresentation: Presentation = {
  title: 'Presentation title',
  slides: slides
};

const defaultEditor: Editor = {
  presentation: newPresentation,
  selection: {
    selectedSlides: slides.length > 0 ? slides[0].id : '',
    selectedObjects: [],
  }
};

export { defaultEditor }

