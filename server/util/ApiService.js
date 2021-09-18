const oauth = require("./oauth");
const secret = require("./credentials");
const fetch = require("node-fetch");

class ApiService {
  constructor(url, method, body) {
    this.url = url;
    this.method = method;
    this.body = body || "";
    this.headers = oauth.getHeaders({
      url: url,
      method: method,
      tokenKey: secret.token.public,
      tokenSecret: secret.token.secret
    });

    this.headers["Content-Type"] = "application/json";
    this.headers["prefer"] = "transient";
  }

  apiCall() {
    if (this.method.toUpperCase() === "GET") {
      return fetch(this.url, {
        method: this.method,
        headers: this.headers
      })
        .then(res => res.json())
        .then(data => {
          return data;
        })
        .catch(e => {
          console.log(e);
          return "Error";
        });
    }
    if (this.method.toUpperCase() === "PATCH") {
      return fetch(this.url, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      })
        .then(res => {
          if (res.status != 204) {
            console.log("Error response: ", res);
            throw `Error while making a PATCH request to the URL: ${this.url}`;
            return false;
          }
          return true;
        })
        .catch(e => {
          console.log(e);
          return e;
        });
    }
    return fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body)
    })
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(e => {
        console.log(e);
        return "Error";
      });
  }
}

module.exports = ApiService;
