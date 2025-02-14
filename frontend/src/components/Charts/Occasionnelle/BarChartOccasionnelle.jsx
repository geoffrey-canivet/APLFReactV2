import ReactECharts from "echarts-for-react";

const BarChartOccasionnelle = ({dataChart}) => {
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


    if (!dataChart || !Array.isArray(dataChart) || dataChart.length === 0) {
        return <p>Aucune donnée disponible pour le graphique</p>;
    }

    // Transformer pour ECharts et calculant le total des sous-transactions
    const formattedData = dataChart.map((item, index) => {
        const totalSubTransactions = Array.isArray(item.subTransactions)
            ? item.subTransactions.reduce((sum, sub) => sum + sub.amount, 0)
            : 0;

        return {
            name: item.name,
            value: totalSubTransactions,
            itemStyle: {
                color: colorPalette[index % colorPalette.length]
            }
        };
    });


    const total = formattedData.reduce((sum, item) => sum + item.value, 0);



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
            data: formattedData.map(item => item.name),
            axisLabel: {
                rotate: 25 ,
                color: '#fff'

            }

        },
        yAxis: {
            type: 'value',
            axisLabel: { color: "#fff" },
            splitLine: false,

        },

        series: [
            {
                data: formattedData,
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(149,149,149,0.2)',
                    borderRadius: [6, 6, 0, 0]
                },
            }
        ]
    };

    return <ReactECharts option={option} />;
};

export default BarChartOccasionnelle;