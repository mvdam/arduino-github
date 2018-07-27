// https://api.github.com/repos/mvdam/arduino-github/issues

const fetch = require("node-fetch");

const GITHUB_USERNAME = "mvdam";
const GITHUB_ACCESS_TOKEN = "97e6f755548612a24caed3dffad35e53458d1170";

const createHeaders = authToken => ({
  Authorization: "Basic " + authToken
});

const base64Encode = input => {
  return Buffer.from(input).toString("base64");
};

const AUTH_TOKEN = base64Encode(`${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}`);

const fetchGithubApi = url => {
  return fetch(url, {
    headers: createHeaders(AUTH_TOKEN)
  }).then(r => r.json());
};

module.exports = fetchGithubApi;
