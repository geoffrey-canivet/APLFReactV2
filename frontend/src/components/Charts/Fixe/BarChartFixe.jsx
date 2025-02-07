import ReactECharts from "echarts-for-react";

const BarChartFixe = ({ dataChart }) => {

    // ✅ Vérification : Si dataChart est undefined ou vide, afficher un message
    if (!dataChart || !Array.isArray(dataChart) || dataChart.length === 0) {
        return <p>Aucune donnée disponible pour le graphique</p>;
    }

    const colorPalette = [
        "#A1C4FD", // Bleu pastel clair
        "#C2E9FB", // Bleu ciel doux
        "#D4A5A5", // Rose poudré
        "#F7C6C7", // Rose pastel
        "#FAD02E", // Jaune pastel doux
        "#B4E1FF", // Bleu glacé
        "#B5EAD7", // Vert menthe pastel
        "#C9CBA3", // Beige doux
        "#E4C1F9", // Lavande clair
        "#FFDAC1"  // Pêche pastel
    ];


    // 🎯 Transformer les données pour le format attendu par ECharts
    const formattedData = dataChart.map((item, index) => ({
        value: item.amount,
        name: item.name,
        itemStyle: {
            color: colorPalette[index % colorPalette.length], // 🔹 Applique une couleur différente en boucle
            borderRadius: [6, 6, 0, 0], // 🔹 Arrondi les coins supérieurs
        }
    }));

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: formattedData.map(item => item.name),  // 🟢 Utilisation des noms réels des catégories
            axisLabel: {
                rotate: 25 ,
                color: '#fff'

            }

        },
        yAxis: {
            type: 'value',
            axisLabel: { color: "#fff" },
            splitLine: false,
/*            splitLine: {
                lineStyle: { color: "rgba(62,62,62,0.67)" } // 🔹 Lignes de grille plus discrètes
            },*/
        },

        series: [
            {
                data: formattedData,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(149,149,149,0.2)',
                    borderRadius: [6, 6, 0, 0]  // 🔹 Ajoute un border-radius au fond des barres
                },
            }
        ]
    };

    return <ReactECharts option={option} />;
};

export default BarChartFixe;
