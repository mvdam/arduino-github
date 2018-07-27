const fetch = require("node-fetch");

const GITHUB_USERNAME = "mvdam";
const GITHUB_ACCESS_TOKEN = "97e6f755548612a24caed3dffad35e53458d1170";

// https://developer.github.com/v3/pulls/

// github test email
// email: martin.van.dam.ordina@gmail.com
// pass: same as for pronto account

// Controlling via Node::
// http://johnny-five.io/api/boards/

// idea:
// * bug-o-meter
//   make a round scale from 0 to 100
//   use servo to move an arrow over this scale
//   use github API to see how much bugs there are
//   let servo react on the amount
//
//   optional: let light blink faster as the amount of bugs increase

const createHeaders = authToken => ({
  Authorization: "Basic " + authToken
});

const base64Encode = input => {
  return Buffer.from(input).toString("base64");
};

const authToken = base64Encode(`${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}`);

const fetchNotifications = (url, token) => {
  return fetch(url, {
    headers: createHeaders(token)
  }).then(r => r.json());
};

let previousNotifications = [];
const NOTIFICATIONS_TIMEOUT = 10000;

const loadNotifications = (
  loadNotificationsTimeout = NOTIFICATIONS_TIMEOUT
) => {
  setTimeout(() => {
    fetchNotifications("https://api.github.com/notifications", authToken)
      .then(response => response.json())
      .then(notifications =>
        notifications.map(({ subject, reason, updated_at, repository }) => ({
          title: subject.title,
          reason,
          updated_at,
          repository: repository.name
        }))
      )
      .then(newNotifications => {
        if (
          previousNotifications.length &&
          previousNotifications.length !== newNotifications.length
        ) {
          console.log("You have a new notification!!");
        } else {
          console.log("Nothing....");
        }

        previousNotifications = newNotifications;
        loadNotifications(NOTIFICATIONS_TIMEOUT);
      })
      .catch(console.error);
  }, loadNotificationsTimeout);
};

loadNotifications(0);
