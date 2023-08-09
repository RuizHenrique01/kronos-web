import CreateUser from './pages/CreateUser';
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='auth' element={<Login />}/>
        <Route path='signup' element={<CreateUser />} />
      </Routes>
    </Router>
  )
}

export default App
