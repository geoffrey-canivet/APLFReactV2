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
            top: 'bottom',
            textStyle: {
                color: "#fff"
            }
        },
        title: {
            text: `Total\n\n${total} €`,
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

    return <ReactECharts option={option} />;
};

export default PieChartFixe;
