import ReactECharts from "echarts-for-react";

const ComparatifCategoriesByMoisAnnee = () => {
    const option = {
        legend: {
            textStyle: {
                color: "#fff"
            }
        },
        tooltip: {},
        dataset: {
            source: [
                ["Courantes", "Loisirs", "Occasionnelles", "Divers"],
                ["Fixes", 43.3, 85.8, 93.7, 34],
            ]
        },
        xAxis: {
            type: "category",
            axisLabel: { color: "#fff" }
        },
        yAxis: {
            axisLabel: { color: "#fff" }
        },
        series: Array(4).fill({ type: "bar" })
    };
    return <>
        <ReactECharts option={option} style={{ width: "100%", height: "400px" }} />
    </>
};

export default ComparatifCategoriesByMoisAnnee;