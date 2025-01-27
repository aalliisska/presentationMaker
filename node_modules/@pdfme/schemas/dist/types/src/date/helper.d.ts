import { Lang, Plugin } from '@pdfme/common';
import { DateSchema } from './types';
export declare const getPlugin: ({ type, defaultFormat, icon, formatsByLang, }: {
    type: 'date' | 'time' | 'dateTime';
    defaultFormat: string;
    icon: string;
    formatsByLang: Record<Lang, string[]>;
}) => Plugin<DateSchema>;
