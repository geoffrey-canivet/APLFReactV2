import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const BarFixeCategoryMonth = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            color: ['red'],
            legend: {
                textStyle: { color: "#fff" }
            },
            tooltip: {},
            dataset: {
                source: [
                    // En-tête du dataset
                    ["Catégorie", "Prix"],
                    ["Courantes", 43.3],
                    ["Loisirs", 85.8],
                    ["Occasionnelles", 93.7],
                    ["Divers", 34]
                ]
            },
            xAxis: {
                type: "category",
                axisLabel: { color: "#fff" }
            },
            yAxis: {
                axisLabel: { color: "#fff" }
            },
            series: [
                {
                    type: "bar",
                    encode: { x: "Catégorie", y: "Prix" },
                    label: {
                        show: true,
                        // Positionné à l'intérieur de la barre, en bas (début de la barre)
                        position: 'insideBottom',
                        // Rotation de 90° pour que le texte s'affiche verticalement
                        rotate: 90,
                        // Aligner le texte pour que son début soit à la base de la barre
                        align: 'left',
                        verticalAlign: 'bottom',
                        // Utiliser une fonction pour formater le texte
                        formatter: function (params) {
                            // params.value est un tableau [catégorie, prix]
                            return params.value[0] + ': ' + params.value[1];
                        },
                        fontSize: 16,
                        color: '#fff'
                    }
                }
            ]
        };

        myChart.setOption(option);

        const handleResize = () => {
            myChart.resize();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarFixeCategoryMonth;
