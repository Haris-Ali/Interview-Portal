import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';

function Heatmap() {
    const series = [
        {
            name: "Hi",
            data: []
        }, 
        {
            name: "Hello", 
            data: []
        },
    ]
    const options = {
        chart: {
            height: 350,
            type: 'heatmap'
        }, 
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                radius: 0,
                useFillColorAsStroke: true,
                colorScale: {
                    ranges: [
                        {
                            from: -30, 
                            to: 5,
                            name: 'low',
                            color: '#00A100'
                        },
                        {
                            from: 6,
                            to: 20,
                            name: 'medium',
                            color: '#128FD9'
                        },
                    ]
                }
            }
        }, 
        dataLabels: {
            enabled: false
        }, 
        stroke: {
            width: 1
        },
        title: {
            text: 'Heatmap'
        }
    }

    return (
        <div>
            <Chart 
                options={options}
                series={series}
                type={heatmap}
                height={350}
            />
        </div>
    )
}

export default Heatmap;