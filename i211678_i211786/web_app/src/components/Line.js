import React from 'react';
import { Chart } from 'chart.js/auto';
import { Line as LineChart } from 'react-chartjs-2';
import '../index.css';

const Line = ({ data }) => {
    const chartData = {
        labels: data[0].map(item => item.date),
        datasets: [
            {
                label: 'Forecasted Price',
                data: data[0].map(item => item.close),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Actual Price',
                data: data[1].map(item => item.close),
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };
    return (
    <div className='flex flex-col pb-2 w-full h-96'>
        <LineChart data={chartData} options={chartOptions}/>
    </div>
    )
};

export default Line;