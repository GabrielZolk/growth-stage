import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { fetchData } from '../services/api';
import { formatMonth } from '../services/utils/formatMonth';
import ChartConfig from '../config/ChartConfig';

interface Data {
    label: string
    time: number
    degree_days: number;
    precipitation: number;
    ndvi: number;
}

const errorMessages = {
    connectionError: "Erro de conexão. Verifique sua internet e tente novamente.",
    serverError: "O servidor encontrou um erro. Por favor, tente novamente mais tarde.",
    dataError: "Ocorreu um erro ao obter os dados. Por favor, tente atualize a página.",
};

function GrowthStage() {
    const [data, setData] = useState<Data[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const apiData = await fetchData();
                setData(apiData);
            } catch (error) {
                if (error.message.includes("Network Error")) {
                    setError(errorMessages.connectionError);
                } else if (error.message.includes("Request failed with status code")) {
                    setError(errorMessages.serverError);
                } else if (error.message.includes("Invalid data")) {
                    setError(errorMessages.dataError);
                } else {
                    setError(`Ocorreu um erro: ${error}`);
                }
                console.error(`${error}`);
            }
        };

        getData();
    }, []);

    const labels = data.map(data => {
        const date = new Date(data.time * 1000);
        const month = formatMonth(date.toLocaleString('default', { month: 'short' }));
        const day = date.getDate();
        return `${month} ${day}`;
    });

    const datasets = ChartConfig.createDatasets(data);

    if (error) {
        return (
            <div className='error'>
                <div>
                    <strong>{error}</strong>
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <Line
            data={{
                labels: labels,
                datasets: datasets
            }}
            options={ChartConfig.options}
        />
    );
}

export default GrowthStage;
