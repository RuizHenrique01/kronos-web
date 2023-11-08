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
import Members from './pages/Members';
import Boards from './pages/Board';
import PrivateGuardRoute from './guards/private.guard';
import AuthGuardRoute from './guards/auth.guard';
import Metrics from './pages/Metrics';

function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider autoHideDuration={5000}>
      <Router>
        <Routes>
          <Route path='' element={<AuthGuardRoute />}>
            <Route path='' element={<Navigate to='auth' />} />
            <Route path='auth' element={<Login />} />
            <Route path='signup' element={<CreateUser />} />
            <Route path='forgetpassword' element={<ResetPassword />} />
          </Route>

          <Route path='' element={<PrivateGuardRoute />}>
            <Route path='' element={<Main />}>

              <Route path='' element={<Navigate to={'inicio'} />} />
              <Route path='inicio' element={<InitialPage />} />
              <Route path='quadros/:id' element={<Boards />} />

              <Route path='projetos'>

                <Route path='' element={<ListProjects />} />
                <Route path='boards' index element={<Boards />} />
                <Route path='primeiro' element={<MessageCreateProject />} />
                <Route path='criar' element={<CreateProject />} />

              </Route>


              <Route path='membros' element={<Members />} />
              <Route path='metricas' element={<Metrics />} />
            </Route>
          </Route>

          <Route path='*' element={<Navigate to='/' />} />

        </Routes>
      </Router>
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default App
