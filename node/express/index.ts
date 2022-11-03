import express from "express";
import { Express, Request, Response } from "express";
import "dotenv/config";
import {
  CreateCredentialTemplateRequest,
  CreateEcosystemRequest,
  CreateProofRequest,
  FieldType,
  InsertItemRequest,
  IssueFromTemplateRequest,
  TemplateData,
  TemplateField,
  TrinsicService,
  VerifyProofRequest,
  ServiceOptions,
  EcosystemInfoRequest,
} from "@trinsic/trinsic";

//-----------------
const app: Express = express();
const port = 8000;

//-----------------
async function getEcoSystemId() {
  const trinsic = new TrinsicService();

  trinsic.setAuthToken(process.env.AUTHTOKEN || "");

  const infoResponse = await trinsic
    .provider()
    .ecosystemInfo(EcosystemInfoRequest.fromPartial({}));

  const ecosystem = infoResponse.ecosystem;

  return ecosystem?.id;
}

//-----------------
app.get("/", async (req: Request, res: Response) => {
  res.send(`Express + TypeScript Server id=${await getEcoSystemId()}`);
});

//-----------------
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
