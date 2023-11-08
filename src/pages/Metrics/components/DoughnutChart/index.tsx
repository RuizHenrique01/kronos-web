import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface IProps {
    labels: Array<string>,
    data: Array<unknown>,

}

const DoughnutChart = ({labels, data}: IProps) => {

    return (<Doughnut data={{
        labels: labels,
        datasets: [
          {
            label: 'Percentual de Tarefas',
            data: data,
            backgroundColor: [
              'rgb(255, 120, 10)',
              'rgb(50, 116, 217)',
              'rgb(115, 191, 105)',
            ],
            borderColor: [
              'rgb(255, 120, 10)',
              'rgb(50, 116, 217)',
              'rgb(115, 191, 105)',
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                fullSize: true,
                labels: {
                    font: {
                        weight: 'bold'
                    },
                    color: 'black',
                }
            },
            title: {
                display: true,
                text: 'Percentual de tarefas por Status',
                font: {
                    size: 18,
                },
                color: '#002D2B'
              },
        }

      }}
      />)
}

export default DoughnutChart;