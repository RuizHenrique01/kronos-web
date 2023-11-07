import { Box } from '@mui/material';
import styles from './metrics.module.css';
import { useGetCurrentProjectState } from '../../store/hooks';
import DoughnutChart from './components/DoughnutChart';
import { useEffect, useState } from 'react';
import { TasksService } from '../../services/task.service';
import LineChart from './components/LineChart';
const Metrics = () => {

    const project = useGetCurrentProjectState();


    const [dataPercent, setDataPercent] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataBurndonw, setDataBurndonw] = useState<Array<any>>([]);

    const taskService = new TasksService();

    useEffect(() => {
        taskService.percentGraphic(project.id!).then(res => setDataPercent(res)).catch(err => console.log(err));
        taskService.burndownGraphic(project.id!).then(res => setDataBurndonw(res)).catch(err => console.log(err));
    }, []);

    return (<section className={styles.metrics_section}>
        <header className={styles.title}>
            <h1>Métricas</h1>
        </header>

        <div className={styles.metrics_content}>
            <Box sx={
                {
                    width: '48%',
                    height: '300px',
                    display: 'flex',
                    background: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }
            }
                className={styles.metrics_content_box}
            >
                {dataPercent && <DoughnutChart labels={Object.keys(dataPercent!)} data={Object.values(dataPercent!)} />}
            </Box>
            <Box sx={
                {
                    width: '48%',
                    height: '300px',
                    display: 'flex',
                    background: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative'
                }
            }
                className={styles.metrics_content_box}
            >
                {dataBurndonw && <LineChart labels={dataBurndonw!.map(d => d.day!.split('T')[0])} dataTotal={dataBurndonw!.map(d => d['progresso total'])} dataAcm={dataBurndonw!.map(d => d['progresso acumulado'])} />}
            </Box>
        </div>

    </section>)
}

export default Metrics;