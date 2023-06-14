import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface DataItem {
    degree_days: number;
    precipitation: number;
    ndvi: number;
  }

const ChartConfig = {
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            }
        }
    },
    createDatasets: (data: DataItem[]) => {
        return [
            {
                label: 'Degree Days',
                data: data.map(data => data.degree_days),
                borderWidth: 2,
                borderColor: '#0101f3',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: '#0101f3',
                pointHoverBackgroundColor: '#0101f3',
                tension: 0.5,
                backgroundColor: '#0101f3'
            },
            {
                label: 'Precipitation',
                data: data.map(data => data.precipitation),
                borderWidth: 2,
                borderColor: '#e26262',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: '#e26262',
                pointHoverBackgroundColor: '#e26262',
                tension: 0.5,
                backgroundColor: '#e26262'
            },
            {
                label: 'NDVI',
                data: data.map(data => data.ndvi),
                borderWidth: 2,
                borderColor: '#00eeff',
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: '#00eeff',
                pointHoverBackgroundColor: '#00eeff',
                tension: 0.5,
                backgroundColor: '#00eeff'
            },
        ];
    }
}

export default ChartConfig;
