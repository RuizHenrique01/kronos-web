import { Box, Tooltip } from '@mui/material';
import styles from './metrics.module.css';
import { useGetCurrentProjectState } from '../../store/hooks';
import DoughnutChart from './components/DoughnutChart';
import { useEffect, useState } from 'react';
import { TasksService } from '../../services/task.service';
import LineChart from './components/LineChart';
import BarVerticalChart from './components/BarVerticalChart';
import BarHorizontalChart from './components/BarHorizontalChart';
import { InfoOutlined } from '@mui/icons-material';
const Metrics = () => {

    const project = useGetCurrentProjectState();


    const [dataPercent, setDataPercent] = useState<{[key: string]: number}>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataBurndonw, setDataBurndonw] = useState<Array<{"day": string, "progresso total": number, "progresso acumulado": number}>>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataCompare, setDataCompare] = useState<Array<{"day": string, "tarefas planejadas": number, "tarefas concluídas": number}>>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataTotal, setDataTotal] = useState<{"Total de Tarefas": number, "Tarefas Concluídas": number}>();

    const taskService = new TasksService();

    useEffect(() => {
        taskService.percentGraphic(project.id!).then(res => setDataPercent(res)).catch(err => console.log(err));
        taskService.burndownGraphic(project.id!).then(res => setDataBurndonw(res)).catch(err => console.log(err));
        taskService.compareGraphic(project.id!).then(res => setDataCompare(res)).catch(err => console.log(err));
        taskService.totalProgressGraphic(project.id!).then(res => setDataTotal(res)).catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Tooltip title="Percentual de tarefas desenvolvidas na Sprint com seu respectivo status.">
                <InfoOutlined sx={{
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        top: 8,
                        right: 8
                    }} />
                </Tooltip>
                {dataPercent && <DoughnutChart labels={Object.keys(dataPercent!).map(d=> `${d} - ${((dataPercent[d] / Object.values(dataPercent!).reduce((a, b) => a + b)) * 100).toFixed(0)}%`
                )} data={Object.values(dataPercent!)} />}
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
                <Tooltip title="Gráfico que representa o progresso total das atividades penejadas realizando a comparação com o progresso acumulado das atividades concluídas.">
                    <InfoOutlined sx={{
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        top: 8,
                        right: 8
                    }} />
                </Tooltip>
                {dataBurndonw && <LineChart labels={dataBurndonw!.map(d => d.day!.split('T')[0])} dataTotal={dataBurndonw!.map(d => d['progresso total'])} dataAcm={dataBurndonw!.map(d => d['progresso acumulado'])} />}
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
                 <Tooltip title="Este gráfico realiza uma comparação entre a quantidade de tarefas planejadas e concluídas por dia.">
                    <InfoOutlined sx={{
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        top: 8,
                        right: 8
                    }} />
                </Tooltip>
                {dataCompare && <BarVerticalChart labels={dataCompare!.map(d => d.day!.split('T')[0])} dataTotal={dataCompare!.map(d => d['tarefas planejadas'])} dataAcm={dataCompare!.map(d => d['tarefas concluídas'])} />}
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
                <Tooltip title="Gráfico que demonstra o progresso total do projeto.">
                    <InfoOutlined sx={{
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        top: 8,
                        right: 8
                    }} />
                </Tooltip>
                {dataTotal && <BarHorizontalChart labels={Object.keys(dataTotal!)} data={Object.values(dataTotal!)} />}
            </Box>
        </div>

    </section>)
}

export default Metrics;