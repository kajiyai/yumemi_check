// pages/api/populationComposition.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const APIKEY: string | undefined = process.env.RESASAPI;

if (!APIKEY) {
  throw new Error("API key is not defined");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prefCode = req.query.prefCode;
  const response = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": APIKEY as string
      }
    }
  );
  const data = await response.json();
  res.status(200).json(data.result)
}