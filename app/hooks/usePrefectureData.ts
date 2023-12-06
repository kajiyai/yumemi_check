import { useState, useEffect } from "react";
import { Prefecture, PrefecturePopulationData } from "../../utils/type";

// 都道府県コードを取得する関数
const fetchPrefCode = async (): Promise<Prefecture[]> => {
  const response = await fetch("/api/prefectures");
  const data = await response.json();
  return data;
};

// 人口構成データを取得する関数
const fetchPopulationComposition = async (
  pref: Prefecture
): Promise<PrefecturePopulationData> => {
  const response = await fetch(
    `/api/populationComposition?prefCode=${pref.prefCode}`
  );
  const data = await response.json();
  return {
    prefName: pref.prefName,
    data: data.data,
    boundaryYear: data.boundaryYear,
  };
};

export const usePrefectureData = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    PrefecturePopulationData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const prefs = await fetchPrefCode();
      setPrefectures(prefs);
    };
    fetchData();
  }, []);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    pref: Prefecture
  ) => {
    if (event.target.checked) {
      const data = await fetchPopulationComposition(pref);
      setSelectedPrefectures((prev) => [...prev, data]);
    } else {
      setSelectedPrefectures((prev) =>
        prev.filter((p) => p.prefName !== pref.prefName)
      );
    }
  };

  return { prefectures, selectedPrefectures, handleCheckboxChange };
};
