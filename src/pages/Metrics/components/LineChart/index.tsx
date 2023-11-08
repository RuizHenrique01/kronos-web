import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface IProps {
    labels: Array<string>,
    dataTotal: Array<unknown>,
    dataAcm: Array<unknown>,

}

const LineChart = ({labels, dataTotal, dataAcm}: IProps) => {

    return (<Line data={{
        labels: labels,
        datasets: [
          {
            label: 'Progresso Total',
            data: dataTotal,
            borderColor: 'rgb(115, 191, 105)',
            backgroundColor: 'rgb(115, 191, 105)',
          },
          {
            label: 'Progresso Acumulado',
            data: dataAcm,
            borderColor: 'rgb(31, 96, 196)',
            backgroundColor: 'rgb(31, 96, 196)',
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
                  weight: 'bold'
              },
              color: 'black'
          }
          },
          title: {
            display: true,
            text: 'Gráfico de Burndown',
            font: {
                size: 18,
            },
            color: '#002D2B'
          },
        },
      }}
      />)
}

export default LineChart;