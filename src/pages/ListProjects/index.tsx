import AddIcon from '@mui/icons-material/Add';
import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import NoProjects from "../NoProjects";
import styles from './listProjects.module.css';
import { ProjectsService } from '../../services/project.service';
import { IProject } from '../../interfaces';
import { useSetMenuItemState } from '../../store/hooks';


const ListProjects = () => {
    const projectsService = new ProjectsService();

    const [projects, setProjects] = useState<Array<IProject>>([]);

    const [isLoading, setIsLoading] = useState(true);
    const setMenuItem = useSetMenuItemState();

    useEffect(() => {

        projectsService.getAllProjects()
            .then((projects) => {
                setProjects([]);
                setProjects([...projects]);

                setTimeout(() => setIsLoading(false), 500);
            })
            .catch(error => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();

    function ISODateToLocaleDate(ISODate: string | undefined) {
        if(!ISODate)
            return

        const date = ISODate.split('T')[0].split('-')
        const yearTemp = date[0];
        date[0] = date[2];
        date[2] = yearTemp;

        return date.join('/');
    }

    return (
        <>
            <header>
                <h1>Projetos</h1>

                <Button sx={{
                    backgroundColor: '#002D2B',

                    fontSize: '0.6em',
                    gap: '0.8em',
                    '&:hover': {
                        backgroundColor: '#002D2B',
                    }
                }} onClick={() => navigate('criar')} variant="contained">
                    <AddIcon />
                    Novo projeto
                </Button>
            </header>



            {isLoading ?
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                }}>
                    <CircularProgress sx={{
                        color: '#FFF',
                    }} />
                </Box>
                : projects.length ?
                    <div className={styles.list_container}>
                        <ul>
                            {projects.map(project => (
                                <li className={styles.card_list} key={project.id} >
                                    <button onClick={() => {
                                        navigate(`/quadros/${project.id}`)
                                        setMenuItem({
                                            projectId: project.id
                                        });
                                    }}>
                                        <div className={styles.informations}>

                                            <h2>{project.title}</h2>
                                            <p className={styles.description} >
                                                {project.description}
                                            </p>
                                        </div>
                                        <p className={styles.last_update}>
                                            <span>Útima atualização</span>
                                            <span>
                                                {
                                                    ISODateToLocaleDate(project.updatedAt)
                                                }
                                            </span>
                                        </p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div> : <NoProjects />

            }


        </>

    )
}

export default ListProjects;