import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ResetPassword from './pages/ResetPassword';
import { SnackbarProvider } from 'notistack';
import Main from './pages/Main';
import InitialPage from './pages/InitialPage';
import ListProjects from './pages/ListProjects';
import MessageCreateProject from './pages/MessageCreateProject';
import CreateProject from './pages/CreateProject';

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
              <Route path='' element={<Navigate to={'inicio'} />} />
              <Route path='inicio' element={<InitialPage />} />
              <Route path='projetos'>
                <Route path='' element={<ListProjects />} />
                <Route path='primeiro' element={<MessageCreateProject />} />
                <Route path='criar' element={<CreateProject />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default App
