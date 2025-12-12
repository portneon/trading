'use client';

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Tooltip,
    Legend,
    zoomPlugin
);

export const ChartComponent = ({ data, colors = {} }) => {
    // Transform data for Chart.js
    const chartData = {
        labels: data.map(d => {
            const date = new Date(d.time * 1000); // timestamp is seconds
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        }),
        datasets: [
            {
                label: 'Price',
                data: data.map(d => d.close),
                borderColor: '#26a69a', // Green-ish teal
                backgroundColor: 'rgba(38, 166, 154, 0.5)',
                tension: 0.1,
                pointRadius: 3, // Show points for visibility
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide legend for cleaner look
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    maxTicksLimit: 10, // Avoid cluttering X axis
                }
            },
            y: {
                display: true,
                position: 'right', // Standard for trading charts
                grid: {
                    color: '#f0f0f0',
                }
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <div className="w-full relative h-[600px]">
            <Line options={options} data={chartData} />
        </div>
    );
};
