import React from 'react';
import ReactECharts from "echarts-for-react";
import useTransacFixeStore from "../../../store/useTransacFixeStore.js";
import useTransacRevenuStore from "../../../store/useTransacRevenuStore.js";
import useTransacOccasStore from "../../../store/useTransacOccasStore.js";

const PieCategoryMonth = () => {


    // STORE
    const { categories: categoriesFixe } = useTransacFixeStore();
    const { categories: categoriesOccasionnelle } = useTransacOccasStore();
    const { categories: categoriesRevenu } = useTransacRevenuStore();


// Calcule total d'une catégorie fixe et revenu
    const calculateTotalFixedCategory = (category) => {
        return category.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

// Calcule total des catégories fixes et revenus
    const calculateTotalFixedCategories = (categories) => {
        return categories.reduce((total, category) => total + calculateTotalFixedCategory(category), 0);
    };

// Calcule total sous transaction occasionnelle
    const calculateTotalOccas = (categories) => {
        return categories.reduce((totalCategory, category) => {
            return totalCategory + category.transactions.reduce((totalTransaction, transaction) => {
                return totalTransaction + transaction.subTransactions.reduce((totalSub, subTransaction) => {
                    return totalSub + subTransaction.amount;
                }, 0);
            }, 0);
        }, 0);
    };

    const totalFixe = calculateTotalFixedCategories(categoriesFixe);
    const totalRevenu = calculateTotalFixedCategories(categoriesRevenu);
    const totalOccas = calculateTotalOccas(categoriesOccasionnelle);



    const option = {
        tooltip: {

        },
        legend: {
            show: true,
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
            text: `{revenu|+ ${totalRevenu} €}\n{fixe|- ${(totalFixe + totalOccas).toFixed(2)} €}`,
            left: '50%',
            top: '50%',
            textAlign: 'center',
            textVerticalAlign: 'middle',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: "#fff",  // Couleur par défaut si non spécifiée
                rich: {
                    revenu: {
                        color: '#4CAF50', // Vert pour les revenus
                        fontWeight: 'bold',
                        fontSize: 18,
                        lineHeight: 30  // Ajoute un espacement plus grand
                    },
                    fixe: {
                        color: '#FF5252', // Rouge pour les dépenses
                        fontWeight: 'bold',
                        fontSize: 18,
                        lineHeight: 30  // Même espacement pour l'alignement
                    }
                }
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
                    { value:
                        totalFixe,
                        name: 'Fixes',
                        itemStyle: { color: '#74C0FC' }
                    },
                    { value: totalOccas, name: 'Occasionnelles', itemStyle: { color: '#F28500' }  },
                    { value: totalRevenu, name: 'Revenus', itemStyle: { color: '#48AE6F' }  },

                ],
                label: {
                    show: false,
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