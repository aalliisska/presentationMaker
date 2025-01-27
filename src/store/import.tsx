import { ChangeEvent } from 'react'
//import { useDispatch } from 'react-redux'
import { Editor, Presentation } from './type'

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { presentationSchema } from '../store/presentationShema'

function isValidPresentation(presentation: Presentation | null): boolean {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(presentationSchema)

  return validate(presentation)
}

const importPresentation = (event: ChangeEvent<HTMLInputElement>, setEditor: (editor: Editor) => void) => {

  const presentation = event.target.files?.[0];
  if (!presentation) {
    console.log('Presentation data is null or undefined.')
    return
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      console.log('tetet')
      const importedPresentation: Presentation = JSON.parse(e.target?.result as string)

      if (!isValidPresentation(importedPresentation)) {
        console.log('Invalid presentation data:', importedPresentation);
        return;
      }
      console.log('importedPresentation', importedPresentation)

      const editor: Editor = {
        presentation: importedPresentation,
        selection: {
          selectedSlides: (importedPresentation as unknown as Editor).presentation.slides[0].id,
          selectedObjects: []
        }
      }
      console.log(editor)
      console.log('tests')
      setEditor(editor)
    } catch (error) {
      console.log('Ошибка при загрузке файла: ', error);
    }
  };
  reader.readAsText(presentation);
};

export { importPresentation }
