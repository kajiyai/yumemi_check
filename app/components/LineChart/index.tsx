import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { PrefecturePopulationData } from '../../../utils/type';

type LineChartProps = {
    selectedPrefectures: PrefecturePopulationData[];
    selectedLabel: string;
    isLoading: boolean;
};

// データ整形関数
const formatPopulationDataForChart = (
    populationData: PrefecturePopulationData[],
    selectedLabel: string,
): any => {
    const allYears = new Set<number>();
    populationData.forEach((data) =>
        data.data[0].data.forEach((item) => allYears.add(item.year)),
    );

    const formattedData: any[] = [];

    allYears.forEach((year) => {
        const yearData: any = { year };
        populationData.forEach((pop) => {
            const popData = pop.data
                .find((d) => d.label === selectedLabel)
                ?.data.find((d) => d.year === year);
            if (popData) {
                yearData[pop.prefName] = popData.value;
            }
        });
        formattedData.push(yearData);
    });

    return formattedData.sort((a, b) => a.year - b.year);
};

// ランダムに色を変える関数
const getRandomColor = () => {
    const colors = [
        "#8884d8",
        "#82ca9d",
        "#ffc658",
        "#ff7300",
        "#a4de6c",
        "#d0ed57",
        "#83a6ed",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const CustomLineChart: React.FC<LineChartProps> = ({ selectedPrefectures = [], selectedLabel = "", isLoading }) => {
    if (isLoading) {
        return <div className="skeletonChart"></div>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={formatPopulationDataForChart(selectedPrefectures, selectedLabel)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedPrefectures.map((pref, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey={pref.prefName}
                        stroke={getRandomColor()}
                        activeDot={{ r: 8 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;