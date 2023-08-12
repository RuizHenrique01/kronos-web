import styles from './menu.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Assessment, Logout } from '@mui/icons-material';
import logo from '../../assets/logo_cronos.png';
import { AuthenticateService } from '../../services/authenticate.service';

const Menu = () => {

    const [toggleMenu, setToggleMenu] = useState<boolean>(true);
    const navigate = useNavigate();
    //const menuItems = useSelector((state) => state.menuItem.items)
    const menuItems = { projectId: 1 };
    const location = useLocation();
    const authService = new AuthenticateService();

    function handleToggleMenu() {

        setToggleMenu(!toggleMenu);
    }

    function goTo(path: string) {
        navigate(path);
    }

    function logout() {
        authService.logout();
        navigate('/auth');
    }

    return (
        <aside className={styles.menu_aside}>
            <ul className={toggleMenu ? styles.open_menu : ''} >

                <li>
                    <button className={toggleMenu ? styles.flip_x_1 : ''} onClick={handleToggleMenu}>
                        <KeyboardDoubleArrowRightIcon />
                    </button>
                </li>

                <li>
                    <button onClick={() => goTo('')}>
                        <DescriptionIcon />
                        Página inicial
                    </button>
                </li>

                <li>
                    <button onClick={() => goTo('projetos')}>
                        <DashboardIcon />
                        Projetos
                    </button>
                </li>

                {(location.pathname.includes('quadros') || location.pathname.includes('membros')) && (<li>
                    <button onClick={() => goTo('/quadros/' + menuItems.projectId)}>
                        <Assessment />
                        Quadros
                    </button>
                </li>)}

                { (location.pathname.includes('quadros') || location.pathname.includes('membros')) && (<li>
                    <button onClick={() => goTo('membros')}>
                        <GroupIcon />
                        Membros
                    </button>
                </li>)}
            </ul>
            <span className={styles.fadeIn}></span>
            <div className={styles.logo_cronos}>
                <div className={styles.logout_button}>
                    <button onClick={logout}>
                        <Logout />
                        Sair
                    </button>
                </div>
                <img width={50} src={logo} alt="Logo Cronos" />
            </div>
        </aside>
    );
}

export default Menu;