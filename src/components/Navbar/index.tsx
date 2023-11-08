import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem, PopoverVirtualElement } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import { useLocation, useNavigate } from 'react-router';
import { useGetCurrentProjectState, useGetSystemState, useGetUserState } from '../../store/hooks';
import { AuthenticateService } from '../../services/authenticate.service';

const Navbar = () => {

    const authenticateService = new AuthenticateService();
    const projectName = useGetCurrentProjectState().title;
    const userStore = useGetUserState();
    const systemStore = useGetSystemState();
    const location = useLocation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        return;
    }, [systemStore]);

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 24,
                height: 24,
                fontSize: '0.9em'
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }


    return (
        userStore && <nav className={styles.navbar}>
            {(location.pathname.includes('membros') || location.pathname.includes('quadros') || location.pathname.includes('metricas')) &&
                <h2>{projectName}</h2>
            }
            <div className={styles.profile_button}>
                <button onClick={e => handleClick(e)}>
                    <div className={styles.avatar_container}>
                        <Avatar variant="circular" {...stringAvatar(`${userStore.name.split(' ')[0]} ${userStore.lastName}`)} />
                    </div>
                    <p>{`${userStore.name.split(' ')[0]} ${userStore.lastName}`}</p>
                    <KeyboardArrowDownIcon />
                </button>

                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'button',
                    }}
                >
                    <MenuItem onClick={() => {
                        authenticateService.logout()
                        navigate("/auth");
                    }}>Sair</MenuItem>
                </Menu>
            </div>

        </nav>
    );
}

export default Navbar;