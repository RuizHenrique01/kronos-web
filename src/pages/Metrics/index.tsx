import { Box } from '@mui/material';
import styles from './metrics.module.css';
import { useGetCurrentProjectState } from '../../store/hooks';
import environments from '../../environments';

const dashboardURLs = [
    {
        url: `${environments.GRAFANA_HOST}/d-solo/de3c1875-a0bc-4ab0-9f83-2b6a420a6dc5/percentual-de-tarefas-por-status?orgId=1&refresh=1s&from=1699003942664&to=1699025542664&panelId=1&theme=light`
    },
    {
        url: `${environments.GRAFANA_HOST}/d-solo/be847455-5f4f-4377-bcb8-97aa5ab7b189/burndown?orgId=1&from=1699243200000&to=1699588800000&theme=light&refresh=1s&panelId=1`
    },
    {
        url: `${environments.GRAFANA_HOST}/d-solo/e58df5d3-e1cf-4ef3-ace8-f78072cbc7ca/comparativo-entre-tarefas-planejas-e-concluidas?from=1699082992003&to=1699104592003&orgId=1&theme=light&refresh=1&panelId=1`
    },
    {
        url: `${environments.GRAFANA_HOST}/d-solo/e79fabf7-1f49-421c-8ec2-eb9702fe6788/progresso-total?from=1699086947680&to=1699108547680&orgId=1&theme=light&refresh=1&panelId=1`
    }
]


const Metrics = () => {

    const project = useGetCurrentProjectState();

    return (<section className={styles.metrics_section}>
        <header className={styles.title}>
                <h1>Métricas</h1>
        </header>

        <div className={styles.metrics_content}>
            {
                dashboardURLs.map(d => (
                <Box sx={
                    {
                        width: '48%',
                        height: '300px',
                        background: 'white',
                    }
                }
                className={styles.metrics_content_box}
                key={d.url}
                >
                    <iframe src={ `${d.url}&var-project_id=${project.id}`} width="100%" height="100%" style={{
                        border: 'none',
                        backgroundColor: 'white'
                    }}>
                    </iframe>
                </Box>
                ))
            }
        </div>

    </section>)
}

export default Metrics;