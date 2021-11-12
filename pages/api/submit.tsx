import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let url: string = JSON.parse(req.body).url;
      if (!url.includes("http")) {
        url = `http://${url}`;
      }
      await fetch(url);
      res.status(200).end();
    } else {
      throw Error("Wrong method.");
    }
  } catch (e) {
    res.status(400).end();
  }
}
