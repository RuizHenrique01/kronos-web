import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from './pages/ResetPassword';
import { SnackbarProvider } from 'notistack';
import Main from './pages/Main';

function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider autoHideDuration={5000}>
        <Router>
          <Routes>
            <Route path='auth' element={<Login />} />
            <Route path='signup' element={<CreateUser />} />
            <Route path='forgetpassword' element={<ResetPassword />} />

            <Route path='' element={<Main />}>
              <Route path='projetos'>
                {/* <Route path='' element={<ListProjects />} /> */}
              </Route>
            </Route>
          </Routes>
        </Router>
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default App
