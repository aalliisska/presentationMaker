import type { SchemaPageArray } from './types';
export declare const replacePlaceholders: (arg: {
    content: string;
    variables: Record<string, any>;
    schemas: SchemaPageArray;
}) => string;
