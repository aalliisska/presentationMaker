// Презентация
type Presentation = {
  title: string;
  slides: Array<Slide>;
}

// Слайд
type Slide = {
  id: string;
  contentObjects: (TextObject | ImageObject | FigureObject)[];
  background: Background,
  position: Position | null
}

// Выделение
type Selection = {
  selectedSlides: string;
  selectedObjects: string[];
}

// Выделение объектов
type ObjectsSelection = {
  objectsId: string[];
  slidesId: string[];
}

// Фон
type Background = BackgroundSolid | BackgroundImage | BackgroundGradient;

// Сплошная заливка
type BackgroundSolid = {
  type: 'solid';
  color: string;
}

// Фоновое изображение
type BackgroundImage = {
  type: 'image';
  src: string;
}

// Градиентный фон
type BackgroundGradient = {
  type: 'gradient';
  colors: { color: string }[];
}

// Расположение
type Position = {
  x: number;
  y: number;
}

// Размер
type Size = {
  width: number;
  height: number;
}

// Характеристики объектов
type CommonObject = {
  id: string;
  position: Position;
  size: Size;
  borderColor: string;
  borderWidth: number;
}

// Текстовый объект
type TextObject = CommonObject & {
  type: 'text';
  value: string;
  textColor: string;
  fontSize: number;
  fontBold: string;
  fontFamily: string;
}

// Объект-изображение
type ImageObject = CommonObject & {
  type: 'image';
  src: string;
  alt: string;
}

// Объект-фигура
type FigureObject = CommonObject & {
  type: 'figure';
  shape: Shape;
  backgroundColor: BackgroundSolid;
}

// Форма фигуры
type Shape = Rectangle | Circle | Triangle | Line;

// Прямоугольник
type Rectangle = {
  type: 'rectangle';
}

// Круг 
type Circle = {
  type: 'circle';
}

// Треугольник
type Triangle = {
  type: 'triangle'
}

// Линия 
type Line = {
  type: 'line';
  // Замкнутость
  points: {
    x: number;
    y: number;
  }[];
}

type Editor = {
  presentation: Presentation,
  selection: Selection
}

export type {
  Presentation,
  Slide,
  Background,
  BackgroundSolid,
  BackgroundGradient,
  BackgroundImage,
  Position,
  Size,
  TextObject,
  ImageObject,
  FigureObject,
  Shape,
  Circle,
  Selection,
  ObjectsSelection,
  Editor
}
