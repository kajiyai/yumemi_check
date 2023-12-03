// pages/api/prefectures.ts
import type { NextApiRequest, NextApiResponse } from 'next'

const APIKEY = process.env.RESASAPI;

if (!APIKEY) {
  throw new Error("RESASAPI is not defined in environment variables");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": APIKEY as string
      }
    }
  );
  const data = await response.json();
  res.status(200).json(data.result)
}