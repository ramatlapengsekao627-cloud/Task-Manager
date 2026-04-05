//allows for navigation in the app
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'

//for importing all pages in the pages folder
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import AddTask from './pages/AddTask'

function App() {
  return (
    <BrowserRouter>

      {/* Navbar shows on every page - its outside of routes */}
      <Navbar />

      {/* Routes decides which page to show based on the URL */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App