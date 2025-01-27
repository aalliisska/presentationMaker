import { Schema, Template, BasePdf, CommonOptions } from './types';
interface ModifyTemplateForDynamicTableArg {
    template: Template;
    input: Record<string, string>;
    _cache: Map<any, any>;
    options: CommonOptions;
    getDynamicHeights: (value: string, args: {
        schema: Schema;
        basePdf: BasePdf;
        options: CommonOptions;
        _cache: Map<any, any>;
    }) => Promise<number[]>;
}
export declare const getDynamicTemplate: (arg: ModifyTemplateForDynamicTableArg) => Promise<Template>;
export {};
