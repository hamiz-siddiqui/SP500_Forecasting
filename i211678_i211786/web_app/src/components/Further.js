import React from 'react';
import { Chart } from 'chart.js/auto';
import { Line as LineChart } from 'react-chartjs-2';
import '../index.css';

const Further = ({ data }) => {
    const chartData = {
        labels: data[2].map(item => item.date),
        datasets: [
            {
                label: 'Forecasted Price',
                data: data[2].map(item => item.close),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const chartOptions = {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows the chart to take up the full width and height of its container
        // Other chart options...
    };
    return (
    <div className='flex flex-col pb-2 w-full h-96'>
        <LineChart data={chartData} options={chartOptions}/>
    </div>
    )
};

export default Further;