"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renamePresentationTitle = renamePresentationTitle;
exports.deleteSlide = deleteSlide;
exports.addSlide = addSlide;
exports.slidePosition = slidePosition;
exports.addText = addText;
exports.addImage = addImage;
exports.addFigure = addFigure;
exports.setPosition = setPosition;
exports.setSize = setSize;
exports.setTextObject = setTextObject;
exports.setTextObjectFontSize = setTextObjectFontSize;
exports.setTextObjectFontFamily = setTextObjectFontFamily;
exports.setSlideBackground = setSlideBackground;
exports.setDefaultBackground = setDefaultBackground;
var uuid_1 = require("uuid");
// изменение названия презентации
function renamePresentationTitle(presentation, newTitle) {
    return __assign(__assign({}, presentation), { title: newTitle });
}
//удаление слайда
function deleteSlide(slides, slideIdToDelete) {
    return slides.filter(function (slide) {
        return slide.id !== slideIdToDelete;
    });
}
// добавление слайда
function addSlide(slides, newSlide) {
    return __spreadArray(__spreadArray([], slides, true), [newSlide], false);
}
// изменение позиции слайда
function slidePosition(slides, firstSlideId, secondSlideId) {
    var firstSlideIndex = slides.findIndex(function (slide) { return slide.id === firstSlideId; });
    var secondSlideIndex = slides.findIndex(function (slide) { return slide.id === secondSlideId; });
    if (firstSlideIndex === -1 || secondSlideIndex === -1) {
        throw new Error('Слайды не найдены');
    }
    if (firstSlideIndex === secondSlideIndex) {
        return slides;
    }
    var temp = slides[firstSlideIndex];
    slides[firstSlideIndex] = slides[secondSlideIndex];
    slides[secondSlideIndex] = temp;
    return slides;
}
// добавление/удаление текста
function addText(slide) {
    var newTextObject = {
        id: (0, uuid_1.v4)(),
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 100,
            height: 30,
        },
        borderColor: 'black',
        borderWidth: 3,
        type: 'text',
        value: 'Новый текст',
        textColor: '#000000',
        fontSize: 20,
        fontBold: 'normal',
        fontFamily: 'Arial'
    };
    return __assign(__assign({}, slide), { contentObjects: __spreadArray(__spreadArray([], slide.contentObjects, true), [newTextObject], false) });
}
// добавление/удаление картинки 
function addImage(slide, src, alt) {
    var newImg = {
        id: (0, uuid_1.v4)(),
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 100,
            height: 30,
        },
        borderColor: 'black',
        borderWidth: 1,
        type: 'image',
        src: src,
        alt: alt,
    };
    return __assign(__assign({}, slide), { contentObjects: __spreadArray(__spreadArray([], slide.contentObjects, true), [newImg], false) });
}
// добавление/удаление фигуры
function addFigure(slide) {
    var newFigure = {
        id: (0, uuid_1.v4)(),
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 30,
            height: 30,
        },
        borderColor: 'green',
        borderWidth: 1,
        type: 'figure',
        shape: {
            type: 'rectangle'
        },
        backgroundColor: {
            type: 'solid',
            color: 'blue'
        },
    };
    return __assign(__assign({}, slide), { contentObjects: __spreadArray(__spreadArray([], slide.contentObjects, true), [newFigure], false) });
}
// изменение позиции текста/картинки
function setPosition(object, position) {
    return __assign(__assign({}, object), { position: position });
}
// изменение размера текста/картинки
function setSize(object, size) {
    return __assign(__assign({}, object), { size: size });
}
// изменение текста
function setTextObject(text, newText) {
    return __assign(__assign({}, text), { value: newText });
}
// изменение размера текста
function setTextObjectFontSize(text, newFont) {
    return __assign(__assign({}, text), { fontSize: newFont });
}
// изменение семейства шрифтов у текста
function setTextObjectFontFamily(text, newFontFamily) {
    return __assign(__assign({}, text), { fontFamily: newFontFamily });
}
// изменение фона слайда
function setSlideBackground(slide, newBackground) {
    return __assign(__assign({}, slide), { background: newBackground });
}
// фон по умолчанию
function setDefaultBackground() {
    var defaultSolid = {
        type: 'solid',
        color: '#FFFFFF'
    };
    return defaultSolid;
}
