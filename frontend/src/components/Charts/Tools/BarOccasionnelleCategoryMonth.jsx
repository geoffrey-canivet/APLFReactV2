import React, {useEffect, useRef} from 'react';
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const BarOccasionnelleCategoryMonth = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            color: ['#F28500'],
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
                axisLabel: { show: false },
                axisTick: { show: false },
                axisLine: { show: false }

            },
            yAxis: {
                axisLabel: { color: "#fff" }
            },
            grid: {
                top: '10%',    // Ajustez cette valeur selon vos besoins
                bottom: '2%', // Ajustez pour que le canvas s'arrête juste en dessous du graphique
                left: '10%',
                right: '10%',
                containLabel: true // Pour que les labels soient inclus dans la zone du graphique
            },
            series: [
                {
                    type: "bar",
                    barWidth: 40,
                    itemStyle: {
                        borderRadius: [10, 10, 0, 0]
                    },
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
                        offset: [2, 9],
                        // Utiliser une fonction pour formater le texte
                        formatter: function (params) {
                            // params.value est un tableau [catégorie, prix]
                            return params.value[0] + ': ' + params.value[1];
                        },
                        fontSize: 14,
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

export default BarOccasionnelleCategoryMonth;