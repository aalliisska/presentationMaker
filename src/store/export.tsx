import { Editor } from '../store/type';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { presentationSchema } from '../store/presentationShema'

function isValidPresentation(presentation: Editor | null): boolean {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(presentationSchema)

  return validate(presentation)
}

/*window.addEventListener('beforeunload', (event: BeforeUnloadEvent) => {
  const message = 'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?';

  event.returnValue = message;
  return message;
});*/

function exportPresentationToJson(presentation: Editor | null, fileName: string) {
  if (!presentation) {
    console.error('Presentation data is null or undefined.')
    return
  }

  if (!isValidPresentation(presentation)) {
    console.error('Invalid presentation data:', presentation);
    return;
  }

  try {
    const jsonString = JSON.stringify(presentation, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    if (fileName) {
      a.download = fileName;
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting presentation:', error);
  }
}

export {
  exportPresentationToJson
};

/* import { Editor } from '../store/type'

function exportPresentationToJson(presentation: Editor | null, fileName: string) {
  const jsonString = JSON.stringify(presentation, null, 2); 
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  if (fileName) {
    a.download = fileName;
  }
  a.click(); 
  URL.revokeObjectURL(url);
}

export {
  exportPresentationToJson
} */
