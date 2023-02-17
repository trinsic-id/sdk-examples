import express from "express";
import { Express, Request, Response } from "express";
import "dotenv/config";
import {
  TrinsicService
} from "@trinsic/trinsic";

//-----------------
const app: Express = express();
const port = 8000;

//-----------------
async function getEcoSystemId() {
  try {
    const trinsic = new TrinsicService();

    trinsic.setAuthToken(process.env.AUTHTOKEN || "");

    const accountInfo = await trinsic.account().info();
    return accountInfo.ecosystemId;
  }
  catch(e){
    console.error(e);
    return "ERROR" + e;
  }
}

//-----------------
app.get("/", async (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server id=${await getEcoSystemId()}`);
});

//-----------------
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
