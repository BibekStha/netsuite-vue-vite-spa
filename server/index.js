require("dotenv").config();

const express = require("express");
const app = express();
var cors = require("cors");
const NSAPIService = require("./util/ApiService");

app.use(cors());

const port = process.env.VITE_API_SERVER_PORT || 3333;

app.post("/", async (req, res) => {
  const restletURL = `https://${process.env.NETSUITE_ACCOUNT}.restlets.api.netsuite.com${process.env.VITE_RESTLET_URL}`;
  console.log("restletURL", restletURL);
  const callRestLet = new NSAPIService(restletURL, `GET`, null);
  const callRestLetRes = await callRestLet.apiCall();
  console.log("callRestLetRes", callRestLetRes);

  res.json(callRestLetRes);
});

app.listen(port, () => {
  console.log(`Dev API server listening at http://localhost:${port}`);
});
