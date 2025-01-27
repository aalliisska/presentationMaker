
import { TopPanel } from './view/topPanel/TopPanel.tsx'
import { BottomPanel } from "./view/bottomPanel/BottomPanel.tsx"
import { HistoryType } from './utils/history.ts'
import { HistoryContext } from './hooks/historyContext.ts'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Slideshow } from './view/slideshow/Slideshow.tsx'
import { Navigate } from 'react-router-dom'

type AppProps = {
  history: HistoryType
}

function App({ history }: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HistoryContext.Provider value={history}>
            <div>
              <TopPanel />
              <BottomPanel />
            </div>
          </HistoryContext.Provider>
        } />
        <Route path="/slideshow" element={
          <Slideshow
          />
        }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

/* import { Editor } from "./store/type.ts"
import { TopPanel } from './view/topPanel/TopPanel.tsx'
import { BottomPanel } from "./view/bottomPanel/BottomPanel.tsx";

type AppProps = {
  editor: Editor,
}

function App({ editor }: AppProps) {
  return (
    <div>
      <TopPanel editor={editor} />
      <BottomPanel editor={editor} />
    </div>
  );
}

export default App
*/