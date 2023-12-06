// types.ts
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationComposition = {
  year: number;
  value: number;
};

export type PopulationData = {
  label: string;
  data: PopulationComposition[];
};

export type PrefecturePopulationData = {
  prefName: string;
  data: PopulationData[];
  boundaryYear: number;
};
