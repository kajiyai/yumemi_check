"use client";

// 必要なモジュールのインポート
import React, { useState } from "react";
import styles from "./page.module.css";
import CheckBox from "./components/CheckBox";
import SelectBox from "./components/SelectBox";
import CustomLineChart from "./components/LineChart";
import { usePrefectureData } from "./hooks/usePrefectureData";
import SkeletonScreen from "./components/SkeletonScreen";

// メインの処理
export default function Home() {
  const { prefectures, selectedPrefectures, handleCheckboxChange, isLoading } =
    usePrefectureData();
  const [selectedLabel, setSelectedLabel] = useState<string>("総人口");

  if (isLoading) {
    return <SkeletonScreen />;
  } else {
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
                handleCheckboxChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(e, pref)
                }
              />
            ))}
        </div>
        <SelectBox
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
        <CustomLineChart
          selectedPrefectures={selectedPrefectures}
          selectedLabel={selectedLabel}
        />
      </>
    );
  }
}
