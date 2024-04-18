import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ClientsPage from './pages/ClientsPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ClientsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
