import ReactECharts from "echarts-for-react";

const ComparatifCategoriesByMoisAnnee = () => {
    const option = {
        legend: {
            textStyle: {
                color: "#fff"  // 🟢 Légende en blanc
            }
        },
        tooltip: {},
        dataset: {
            source: [
                ["product", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                ["Fixes", 43.3, 85.8, 93.7, 34, 45, 66, 78, 54, 23, 89, 90, 100],
                ["Occasionnelles", 83.1, 73.4, 55.1, 45, 67, 34, 12, 90, 43, 67, 88, 45],
                ["Revenu", 86.4, 65.2, 82.5, 56, 78, 45, 23, 67, 89, 54, 76, 88]
            ]
        },
        xAxis: {
            type: "category",
            axisLabel: { color: "#fff" } // 🟢 Couleur des labels de l'axe X
        },
        yAxis: {
            axisLabel: { color: "#fff" } // 🟢 Couleur des labels de l'axe Y
        },
        series: Array(12).fill({ type: "bar" }) // 🟢 Génère dynamiquement 12 séries pour les 12 mois
    };


    return <>
        <ReactECharts option={option} style={{ width: "100%", height: "400px" }} />
    </>
};

export default ComparatifCategoriesByMoisAnnee;