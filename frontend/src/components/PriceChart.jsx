"use client";
import React, { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
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
    Legend,
    Filler,
    zoomPlugin
);

export const PriceChart = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data) return { labels: [], datasets: [] };

        const labels = data.map((d) => {
            const date = new Date(d.time * 1000);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        });

        const prices = data.map((d) => d.close);

        // Add 15 empty data points to create right-side margin
        const padding = 15;
        const paddedLabels = [...labels, ...Array(padding).fill('')];

        return {
            labels: paddedLabels,
            datasets: [
                {
                    label: 'Price',
                    data: prices,
                    borderColor: '#4f46e5', // indigo-600
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
                        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
                        return gradient;
                    },
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    fill: true,
                    tension: 0.1,
                    spanGaps: false // Ensure line doesn't connect over empty labels
                },
            ],
        };
    }, [data]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'linear'
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 6,
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                },
                border: {
                    display: false
                }
            },
            y: {
                position: 'right',
                grid: {
                    color: '#f1f5f9',
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 11
                    },
                    callback: (value) => `$${value.toFixed(2)}`
                },
                border: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#0f172a',
                bodyColor: '#334155',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `$${context.parsed.y.toFixed(2)}`,
                    title: (context) => context[0].label
                },
                titleFont: {
                    size: 13,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 12
                }
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <div className="w-full h-[500px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="h-full w-full">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};
