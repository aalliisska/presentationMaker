const backgroundSolid = {
  type: 'object',
  properties: {
    type: {
      const: 'solid'
    },
    color: {
      type: 'string'
    }
  },
  required: ['type', 'color'],
  additionalProperties: false
};

const backgroundImage = {
  type: 'object',
  properties: {
    type: {
      const: 'image'
    },
    src: {
      type: 'string'
    }
  },
  required: ['type', 'src'],
  additionalProperties: false
};

const backgroundGradient = {
  type: 'object',
  properties: {
    type: {
      const: 'gradient'
    },
    colors: {
      type: 'array',
      items: { 
        type: 'object',
        properties: {
          color: { type: 'string' }
        },
        required: ['color'],
        additionalProperties: false
      }
    }
  },
  required: ['type', 'colors'],
  additionalProperties: false
};

const background = { oneOf: [backgroundSolid, backgroundImage, backgroundGradient] };

const position = {
  type: 'object',
  properties: {
    x: { type: 'number' }, 
    y: { type: 'number' } 
  },
  required: ['x', 'y'],
  additionalProperties: false
};

const size = {
  type: 'object',
  properties: {
    width: { type: 'number' }, 
    height: { type: 'number' }
  },
  required: ['width', 'height'],
  additionalProperties: false
};

const commonObject = {
  type: 'object',
  properties: {
    id: { type: 'string' }, 
    position,
    size,
    borderColor: { type: 'string' }, 
    borderWidth: { type: 'number' }  
  },
  required: ['id', 'position', 'size', 'borderColor', 'borderWidth'],
  additionalProperties: false
};

const textObject = {
  allOf: [
    commonObject,
    {
      type: 'object',
      properties: {
        type: { enum: ['text'] },
        value: { type: 'string' }, 
        textColor: { type: 'string' }, 
        fontSize: { type: 'number' },
        fontBold: { type: 'string' }, 
        fontFamily: { type: 'string' } 
      },
      required: ['type', 'value', 'textColor', 'fontSize', 'fontBold', 'fontFamily'],
      additionalProperties: false
    }
  ]
};

const imageObject = {
  allOf: [
    commonObject,
    {
      type: 'object',
      properties: {
        type: { enum: ['image'] },
        src: { type: 'string' },
        alt: { type: 'string' }
      },
      required: ['type', 'src', 'alt'],
      additionalProperties: false
    }
  ]
};

const slide = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    contentObjects: {
      type: 'array',
      items: {
        oneOf: [textObject, imageObject]
      }
    },
    background,
    position,
  },
  required: ['id', 'contentObjects', 'background', 'position'],
  additionalProperties: false
};

const selection = {
  type: 'object',
  properties: {
    selectedSlides: { type: 'string' },
    selectedObjects: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['selectedSlides', 'selectedObjects'],
  additionalProperties: false
};

const presentation = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    slides: {
      type: 'array',
      items: {
        $ref: '#/definitions/slide'
      }
    }
  },
  required: ['slides'],
  additionalProperties: true
};

const presentationSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: 'object',
  properties: {
    presentation: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        slides: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              contentObjects: {
                type: 'array',
                items: { type: 'object' }
              },
              background: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  color: { type: 'string' }
                },
                required: ['type', 'color'],
                additionalProperties: false
              },
              position: { type: ['null', 'object'] }
            },
            required: ['id', 'contentObjects', 'background'],
            additionalProperties: false
          },
          minItems: 1
        }
      },
      required: ['slides'],
      additionalProperties: true
    },
    selection: {
      type: 'object',
      properties: {
        selectedSlides: { type: 'string' },
        selectedObjects: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['selectedSlides'],
      additionalProperties: true
    }
  },
  required: ['presentation', 'selection'],
  additionalProperties: false
};

export { presentationSchema };