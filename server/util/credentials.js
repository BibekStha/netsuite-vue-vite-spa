require("dotenv").config();

const consumer = {
  public: process.env.TBA_CONSUMER_KEY,
  secret: process.env.TBA_CONSUMER_SECRET,
};
const token = {
  public: process.env.TBA_TOKEN_KEY,
  secret: process.env.TBA_TOKEN_SECRET,
};
const realm = process.env.NETSUITE_ACCOUNT_REALM;

module.exports = {
  consumer: consumer,
  token: token,
  realm: realm,
};
