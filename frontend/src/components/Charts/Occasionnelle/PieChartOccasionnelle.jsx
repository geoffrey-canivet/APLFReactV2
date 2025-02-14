import React from 'react';
import ReactECharts from "echarts-for-react";

const PieChartOccasionnelle = ({ dataChart }) => {

    if (!dataChart || !Array.isArray(dataChart) || dataChart.length === 0) {
        return <p>Aucune donnée disponible pour le graphique</p>;
    }

    console.log("graph occas -> ", dataChart);


    const formattedData = dataChart.map(item => {

        const totalSubTransactions = Array.isArray(item.subTransactions)
            ? item.subTransactions.reduce((sum, sub) => sum + sub.amount, 0)
            : 0;

        return {
            name: item.name,
            value: totalSubTransactions
        };
    });

    const total = formattedData.reduce((sum, item) => sum + item.value, 0);

    const option = {
        tooltip: {},
        legend: {
            top: 'bottom',
            textStyle: {
                color: "#fff"
            }
        },
        title: {
            text: `Total\n\n${total} €`,
            left: '50%',       // Centre horizontalement
            top: '50%',        // Centre verticalement
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: "#fff"
            }
        },
        avoidLabelOverlap: false,
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: "Transaction",
                type: "pie",
                radius: ['40%', '70%'],
                selectedMode: 'single',
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10,
                },
                data: formattedData,
                label: {
                    color: "#fff"
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
        ],
    };

    return <ReactECharts option={option} />;
};

export default PieChartOccasionnelle;
