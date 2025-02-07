import ReactECharts from "echarts-for-react";

const PieChartFixe = ({ dataChart }) => {


    // ✅ Vérification : Si dataChart est undefined ou vide, afficher un message
    if (!dataChart || !Array.isArray(dataChart) || dataChart.length === 0) {
        return <p>Aucune donnée disponible pour le graphique</p>;
    }

    // Transformer les données pour le format attendu par ECharts
    const formattedData = dataChart.map(item => ({
        name: item.name,
        value: item.amount  // 'amount' doit être converti en 'value'
    }));


    const total = formattedData.reduce((sum, item) => sum + item.value, 0);
    const option = {
        tooltip: {

        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            top: 'bottom',
            textStyle: {
                color: "#fff"
            },
            itemGap: 10,           // 🔹 Espacement entre les éléments de la légende
            bottom: '0%',
            margin: [0, 0, 0, 0],  // 🔹 Ajoute un espace (haut, droite, bas, gauche)
        },
        grid: {
            bottom: '20%' // ✅ Ajoute encore plus d’espace en bas
        },
        title: {
            text: `Total\n\n${total.toFixed(2)} €`,
            left: '50%',       // ✅ Centre horizontalement
            top: '50%',        // ✅ Centre verticalement
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

    return (
        <div style={{ width: '400px', height: '450px', margin: '0 auto', paddingBottom: '30px' }}> {/* ✅ Ajuste la taille */}
            <ReactECharts option={option} style={{ width: '100%', height: '100%' }} /> {/* ✅ Empêche le débordement */}
        </div>
    );
};

export default PieChartFixe;
