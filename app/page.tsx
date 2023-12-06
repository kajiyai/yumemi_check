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
import CheckBox from "./components/CheckBox";
import SelectBox from "./components/SelectBox";
import CustomLineChart from './components/LineChart';


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
            <CheckBox
              key={pref.prefName}
              id={pref.prefName}
              value={pref.prefCode}
              label={pref.prefName}
              handleCheckboxChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, pref)}
            />
          ))}
      </div>
      <SelectBox selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
      <CustomLineChart selectedPrefectures={selectedPrefectures} selectedLabel={selectedLabel} />
    </>
  );
}
