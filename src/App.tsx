import Home from "./pages/Home"
import SellPage from "./pages/SellPage"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const App = () => {
  return (
 <Router>
  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/sell" element={<SellPage />} /> 
  </Routes>
 </Router>
  )
}

export default App