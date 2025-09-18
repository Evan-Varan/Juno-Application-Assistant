
import './App.css'
import JunoBuild from './JunoBuild'
import { CurrentChatProvider } from './CurrentChatContext'

function App() {

  return (
    <CurrentChatProvider>
      <JunoBuild />
    </CurrentChatProvider>


  )
}

export default App
