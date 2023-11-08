import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface IProps {
    labels: Array<string>,
    data: Array<unknown>,

}

const BarHorizontalChart = ({ labels, data }: IProps) => {

    return (<Bar data={{
        labels: labels,
        datasets: [
            {
                label: 'Total de Tarefas',
                data: data,
                borderColor: ['rgb(31, 96, 196)', 'rgb(115, 191, 105)'],
                backgroundColor: ['rgb(31, 96, 196)', 'rgb(115, 191, 105)'],

            },
        ],
    }}

        options={{
            responsive: true,
            indexAxis: 'y' as const,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    ticks: {
                        callback: function (value) { if (value % 1 === 0) { return value; } }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Progresso total',
                    font: {
                        size: 18,
                    },
                    color: '#002D2B'
                },
            },
        }}
    />)
}

export default BarHorizontalChart;