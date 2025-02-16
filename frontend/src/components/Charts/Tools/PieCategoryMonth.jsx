import React from 'react';
import ReactECharts from "echarts-for-react";

const PieCategoryMonth = () => {
    const option = {
        tooltip: {

        },
        legend: {
            show: false,
            orient: 'horizontal',
            left: 'center',
            top: 'bottom',
            textStyle: {
                color: "#fff"
            },
            itemGap: 10,
            bottom: '0%',
            margin: [0, 0, 0, 0],
        },

        title: {
            text: `Total €`,
            left: '50%',
            top: '50%',
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
            show: false,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
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
                name: "Transaction",
                type: "pie",
                radius: ['45%', '70%'],
                selectedMode: 'single',
                /*roseType: 'area',*/
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10,

                },
                data: [
                    { value: 30, name: 'Fixes' },
                    { value: 50, name: 'Occasionnelles' },
                    { value: 20, name: 'Revenus' },

                ],
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

    return (
        <div style={{width: '100%', height: '400px'}}>
            <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default PieCategoryMonth;