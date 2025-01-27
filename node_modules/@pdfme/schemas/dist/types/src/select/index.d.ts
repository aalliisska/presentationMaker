import { Plugin } from '@pdfme/common';
import { TextSchema } from '../text/types';
interface Select extends TextSchema {
    options: string[];
}
declare const schema: Plugin<Select>;
export default schema;
