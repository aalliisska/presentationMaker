import { pdfRender as parentPdfRender } from '../text/pdfRender';
import { substituteVariables, validateVariables } from './helper';
export const pdfRender = async (arg) => {
    const { value, schema, ...rest } = arg;
    if (!validateVariables(value, schema)) {
        // Don't render if a required variable is missing
        return;
    }
    const renderArgs = {
        value: substituteVariables(schema.text || '', value),
        schema,
        ...rest,
    };
    await parentPdfRender(renderArgs);
};
//# sourceMappingURL=pdfRender.js.map