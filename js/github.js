// https://api.github.com/repos/mvdam/arduino-github/issues

const fetch = require('node-fetch')

const GITHUB_USERNAME = 'mvdam'
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN

if (!GITHUB_ACCESS_TOKEN) {
  throw new Error('GITHUB_ACCESS_TOKEN not defined!')
}

const createHeaders = authToken => ({
  Authorization: 'Basic ' + authToken
})

const base64Encode = input => {
  return Buffer.from(input).toString('base64')
}

const AUTH_TOKEN = base64Encode(`${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}`)

const fetchGithubApi = url => {
  return fetch(url, {
    headers: createHeaders(AUTH_TOKEN)
  }).then(r => r.json())
}

module.exports = fetchGithubApi
