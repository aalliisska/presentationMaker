import React, { useContext } from 'react'
import { MenuContext } from '../../view/navState/NavState'
import styles from './SideMenu.module.css'
import { exportPresentationToJson } from '../../store/export'
import { ImportButton } from '../ImportButton/ImportButton'
import { ExportButton } from '../ExportButton/ExportButton'
import importing from '../../assets/import.svg'
import exporting from '../../assets/export.svg'
import { useAppSelector } from '../../hooks/useAppSelector'
import { importPresentation } from '../../store/import'
import { exportPresentationToPdf } from '../../store/exportToPdf'
import { useDispatch } from 'react-redux'
import { setEditor } from '../../store/redux/editorActionCreators'

interface SideMenuProps {
    children?: React.ReactNode
}

const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const dispatch = useDispatch()
    const { isMenuOpen } = useContext(MenuContext);
    const editor = useAppSelector(editor => editor)
    function downloadPresentation() {
        exportPresentationToJson(editor, editor?.presentation.title)
    }

    function downloadPresentationInPdf() {
        exportPresentationToPdf(editor, editor?.presentation.title)
    }

    return (
        <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            {children || (
                <>
                    <ExportButton
                        label={'Export Presentation JSON'}
                        icon={exporting}
                        alt={'export'}
                        className={styles.export}
                        href={'exporting'}
                        onClick={downloadPresentation}
                        >
                    </ExportButton>

                    <ExportButton
                        label={'Export Presentation PDF'}
                        icon={exporting}
                        alt={'export'}
                        className={styles.export}
                        href={'exporting'}
                        onClick={downloadPresentationInPdf}
                        >
                    </ExportButton>

                    <ImportButton
                        label={'Import Presentation JSON'}
                        inputId={'import'}
                        type={'file'}
                        icon={importing}
                        alt={'import'}
                        className={styles.import}
                        onChange={e => importPresentation(e, newEditor => dispatch(setEditor(newEditor)))}
                        ></ImportButton>
                </>
            )}
        </nav>
    );
};

export default SideMenu;

/*import React, { ChangeEvent, useContext } from 'react'
import { MenuContext } from '../../view/navState/NavState'
import { exportPresentationToJson } from '../../store/export'
import { getEditor, setEditor } from '../../store/editor'
import { render } from '../../main'
import styles from './SideMenu.module.css'

interface SideMenuProps {
    children?: React.ReactNode 
}

const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const { isMenuOpen } = useContext(MenuContext)

    function downloadPresentation() {
        exportPresentationToJson(getEditor(), getEditor()?.presentation.title)
    }

    function importPresentation(event: ChangeEvent<HTMLInputElement>) {
        const presentation = event.target.files?.[0]
        if (!presentation) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const currentEditor = JSON.parse(e.target?.result as string)
                setEditor(currentEditor)
                render()
            } catch (error) {
                console.error('Ошибка при загрузке файла: ', error)
            }
        }
        reader.readAsText(presentation)
    }

    return (
        <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            {children || (
                <>
                    <a className={styles.menuLink} href="#" onClick={downloadPresentation}>Экспорт</a>
                    <input type={'file'} className={styles.import} onChange={importPresentation}>Импорт</input>
                </>
            )}
        </nav>
    );
};

export default SideMenu; */