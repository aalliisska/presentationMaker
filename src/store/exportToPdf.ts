import { Editor, Background } from '../store/type'
import { jsPDF } from 'jspdf'
import { ROBOTOBASE64 } from './Fonts/roboto'
import { OPENSANSBASE64 } from './Fonts/openSans'
import { CAVEATBASE64 } from './Fonts/caveat'

function exportPresentationToPdf(presentation: Editor | null, fileName: string) {
    if (!presentation) {
        console.error("Презентация не найдена")
        return
    }

    const { presentation: pres } = presentation;
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1100, 620]
    })

    doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64)
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal')

    doc.addFileToVFS('Caveat.ttf', caveatBase64)
    doc.addFont('Caveat.ttf', 'Caveat', 'normal')

    doc.addFileToVFS('OpenSans.ttf', openSansBase64)
    doc.addFont('OpenSans.ttf', 'OpenSans', 'normal')


    for (let index = 0; index < pres.slides.length; index++) {
        const slide = pres.slides[index]

        if (index > 0) {
            doc.addPage()
        }

        const background = setSlideBackground(slide.background)
        if (background && background.type === 'solid') {
            const [r, g, b] = hexToRgb(background.color)
            doc.setFillColor(r, g, b)
            doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F')
        }

        console.log(`Обработка слайда ${index + 1} с ${slide.contentObjects.length} объектами`)

        for (const contentObject of slide.contentObjects) {
            console.log(`Объект: ${contentObject}, Позиция: ${contentObject.position.x}, ${contentObject.position.y}`)
            switch (contentObject.type) {
                case 'text':
                    doc.setFontSize(contentObject.fontSize)
                    doc.setFont(contentObject.fontFamily)
                    const textColor = contentObject.textColor
                    const [r, g, b] = hexToRgb(textColor)
                    doc.setTextColor(r, g, b)
                    doc.text(contentObject.value, contentObject.position.x, contentObject.position.y)
                    break
                case 'image':
                    const imgData = contentObject.src
                    if (typeof imgData === "string") {
                        console.log(`Объект: ${contentObject}, Позиция: ${contentObject.position.x}, ${contentObject.position.y}`)
                        doc.addImage(imgData as string, 'PNG', contentObject.position.x, contentObject.position.y, (contentObject.size.width as number), (contentObject.size.height as number))
                    } else {
                        console.error("Ошибка: imgData не является строкой")
                    }
                    break
                default:
                    break
            }
        }
    }

    doc.save(`${fileName || 'presentation'}.pdf`);
}

const setSlideBackground = (background: Background) => {
    switch (background.type) {
        case 'solid':
            return { type: 'solid', color: background.color }
        /*case 'image':
            return { type: 'image', src: background.src };
        case 'gradient':
            return { 
                type: 'gradient', 
                colors: background.colors.map(colorObj => colorObj.color) 
            };*/
        default:
            return null
    }
}

const hexToRgb = (hex: string): [number, number, number] => {
    let r = 0, g = 0, b = 0
    hex = hex.replace(/^#/, '')
    if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16)
        g = parseInt(hex.substring(2, 4), 16)
        b = parseInt(hex.substring(4, 6), 16)
    }
    return [r, g, b]
}

const robotoBase64 = `${ROBOTOBASE64}`
const caveatBase64 = `${CAVEATBASE64}`
const openSansBase64 = `${OPENSANSBASE64}`

export { exportPresentationToPdf } 
