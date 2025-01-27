import styles from "./TopPanel.module.css"
import { Title } from '../title/Title.tsx'
import { Toolbar } from "../toolbar/Toolbar.tsx"
import NavState from '../navState/NavState.tsx'
import MainMenu from '../../components/MainMenu/MainMenu.tsx'

function TopPanel() {

  return (
    <div className={styles.topPanel}>
      <div className={styles.title}>
        <NavState>
          <MainMenu />
        </NavState>
        <Title />
      </div>
      <Toolbar />
    </div>
  )

}

export { TopPanel }
