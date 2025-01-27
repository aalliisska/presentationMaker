"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const utils_js_1 = require("../utils.js");
const lucide_1 = require("lucide");
const type = 'time';
const defaultFormat = 'HH:mm';
const formatsByLang = {
    en: [defaultFormat, 'hh:mm a', 'HH:mm:ss', 'hh:mm:ss a'],
    zh: [defaultFormat, 'HH时mm分', 'HH:mm:ss'],
    ja: [defaultFormat, 'HH時mm分', 'HH:mm:ss'],
    ko: [defaultFormat, 'a h시 mm분', 'HH:mm:ss'],
    ar: [defaultFormat, 'hh:mm a', 'HH:mm:ss'],
    th: [defaultFormat, 'HH.mm', 'HH:mm:ss'],
    pl: [defaultFormat, 'HH:mm:ss'],
    it: [defaultFormat, 'HH.mm', 'HH:mm:ss'],
    de: [defaultFormat, 'HH.mm', 'HH:mm:ss'],
    es: [defaultFormat, 'hh:mm a', 'HH:mm:ss'],
    fr: [defaultFormat, 'HH:mm:ss'],
};
const icon = (0, utils_js_1.createSvgStr)(lucide_1.Clock);
exports.default = (0, helper_1.getPlugin)({ type, defaultFormat, icon, formatsByLang });
//# sourceMappingURL=time.js.map