import React, {useEffect, useRef} from 'react';
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import useTransacRevenuStore from "../../../store/useTransacRevenuStore.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleDown, faCircleUp, faLandmark, faWallet} from "@fortawesome/free-solid-svg-icons";

const BarRevenuCategoryMonth = () => {
    const chartRef = useRef(null);
    const { categories: categoriesRevenu } = useTransacRevenuStore();

// Transformation des données
    const datasetSource = [["Catégorie", "Prix"]];

    categoriesRevenu.forEach(category => {
        const totalAmount = category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        datasetSource.push([category.name, totalAmount.toFixed(2)]);
    });

    // Trouver la plus grande et la plus petite dépense
    let maxExpense = { name: "", amount: 0 };
    let minExpense = { name: "", amount: Infinity };

    categoriesRevenu.forEach(category => {
        const totalAmount = category.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        // Vérification pour la plus grande dépense
        if (totalAmount > maxExpense.amount) {
            maxExpense = { name: category.name, amount: totalAmount };
        }

        // Vérification pour la plus petite dépense
        if (totalAmount < minExpense.amount) {
            minExpense = { name: category.name, amount: totalAmount };
        }
    });

// Arrondir les valeurs à deux décimales
    maxExpense.amount = maxExpense.amount.toFixed(2);
    minExpense.amount = minExpense.amount.toFixed(2);

    console.log("Plus grande dépense :", maxExpense);
    console.log("Plus petite dépense :", minExpense);

    useEffect(() => {
        const myChart = echarts.init(chartRef.current);

        const option = {
            color: ['#48AE6F'],
            legend: {
                textStyle: { color: "#fff" }
            },
            tooltip: {},
            dataset: {
                source: datasetSource,

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
                    // Réduire la largeur des barres (vous pouvez ajuster cette valeur)
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
    }, [categoriesRevenu]);

    return (
        <>
            <div ref={chartRef} style={{width: '100%', height: '400px'}}/>
            <ul>
                <li className=" sm:py-4  px-4 hover:bg-gray-500 rounded-lg">
                    <div className="flex items-center">
                        <div className="p-3 bg-gray-900 rounded-lg mr-3">
                            <FontAwesomeIcon className="text-green-400 w-6 h-6" icon={faWallet}/>
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Revenus
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <FontAwesomeIcon className="text-red-400" icon={faCircleUp}/> {maxExpense.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <FontAwesomeIcon className="text-green-400" icon={faCircleDown}/> {minExpense.name}
                            </p>
                        </div>
                        <div
                            className="flex flex-col  text-sm font-semibold text-gray-900 dark:text-white">

                            <div className="text-red-400">{maxExpense.amount} €</div>
                            <div className="text-green-400">{minExpense.amount} €</div>

                        </div>

                    </div>
                </li>
            </ul>
        </>
    )


};

export default BarRevenuCategoryMonth;