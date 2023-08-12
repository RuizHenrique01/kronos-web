import { Outlet } from "react-router";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";
import styles from './main.module.css';
import { useEffect } from "react";
import { Box, CircularProgress, Dialog, DialogContent } from "@mui/material";
import { useGetSystemState, useGetUserState, useSetSystemState } from "../../store/hooks";

const Main = () => {

    const systemState = useGetSystemState();
    const authState = useGetUserState();
    const setSystem = useSetSystemState();
  
    useEffect(() => {
      if (authState.isAuthenticated && systemState.loadingSystem) {
        setTimeout(() => {
            setSystem({
                loadingSystem: false
            });
        }, 1000)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState, systemState])

    return (
        <>
            <Dialog 
                open={systemState.loadingSystem}
                >
                <DialogContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '.choice': {
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginTop: '25px',
                        }
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                    }}>
                        <CircularProgress sx={{
                            color: 'var(--main-color)',
                        }} />
                    </Box>
                </DialogContent>
            </Dialog>

            {
                !systemState.loadingSystem &&
                <main className={styles.layout_container}>
                    <Menu />
                    <section className={styles.layout_section} >
                        <Navbar />
                        <Outlet></Outlet>
                    </section>
                </main>
            }
        </>
    )
}

export default Main;
