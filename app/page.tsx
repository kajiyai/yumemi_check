"use client";

// 必要なモジュールのインポート
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./page.module.css";
import { Prefecture, PrefecturePopulationData } from '../utils/type';


// 都道府県コードを取得する関数
const fetchPrefCode = async (): Promise<Prefecture[]> => {
  const response = await fetch("/api/prefectures");
  const data = await response.json();
  return data;
};

// 人口構成データを取得する関数
const fetchPopulationComposition = async (
  pref: Prefecture,
): Promise<PrefecturePopulationData> => {
  const response = await fetch(
    `/api/populationComposition?prefCode=${pref.prefCode}`,
  );
  const data = await response.json();
  console.log(data); // データをログ出力
  return {
    prefName: pref.prefName,
    data: data.data,
    boundaryYear: data.boundaryYear,
  };
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

// メインの処理
export default function Home() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    PrefecturePopulationData[]
  >([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("総人口");

  useEffect(() => {
    const fetchData = async () => {
      const prefs = await fetchPrefCode();
      setPrefectures(prefs);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    pref: Prefecture,
  ) => {
    if (event.target.checked) {
      const data = await fetchPopulationComposition(pref);
      setSelectedPrefectures((prev) => [...prev, data]);
    } else {
      setSelectedPrefectures((prev) =>
        prev.filter((p) => p.prefName !== pref.prefName),
      );
    }
  };

  return (
    <>
      <h1 className={styles.title}>日本の都道府県別人口構成</h1>
      <div className={styles.grid}>
        {prefectures &&
          prefectures.map((pref) => (
            <div key={pref.prefCode}>
              <input
                type="checkbox"
                id={pref.prefName}
                value={pref.prefCode}
                onChange={(e) => handleCheckboxChange(e, pref)}
              />
              <label htmlFor={pref.prefName}>{pref.prefName}</label>
            </div>
          ))}
      </div>
      <div className="selectContainer">
        <select
          className="selectBox"
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
        >
          <option value="総人口">総人口</option>
          <option value="年少人口">年少人口</option>
          <option value="生産年齢人口">生産年齢人口</option>
          <option value="老年人口">老年人口</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formatPopulationDataForChart(
            selectedPrefectures,
            selectedLabel,
          )}
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
    </>
  );
}
