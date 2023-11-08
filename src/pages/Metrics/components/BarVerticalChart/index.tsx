import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface IProps {
    labels: Array<string>,
    dataTotal: Array<unknown>,
    dataAcm: Array<unknown>,

}

const BarVerticalChart = ({ labels, dataTotal, dataAcm }: IProps) => {

    return (<Bar data={{
        labels: labels,
        datasets: [
            {
                label: 'Tarefas Planejadas',
                data: dataTotal,
                borderColor: 'rgb(115, 191, 105)',
                backgroundColor: 'rgb(115, 191, 105)',
            },
            {
                label: 'Tarefas Concluídas',
                data: dataAcm,
                borderColor: 'rgb(242, 204, 12)',
                backgroundColor: 'rgb(242, 204, 12)',
            },
        ],
    }}

        options={{
            responsive: true,
            scales: {
                y:{
                  ticks:{
                    callback: function(value) {if (Number(value) % 1 === 0) {return value;}}
                  }
                }
            },
            plugins: {
                legend: {
                    position: 'top' as const,
                    labels: {
                        font: {
                            weight: 'bold',
                        },
                        color: 'black'
                    }
                },
                title: {
                    display: true,
                    text: 'Comparativo entre tarefas planejadas e concluídas',
                    font: {
                        size: 18,
                    },
                    color: '#002D2B'
                },
            },
        }}
    />)
}

export default BarVerticalChart;