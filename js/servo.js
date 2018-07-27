// https://github.com/mvdam/arduino-github/issues

const five = require("johnny-five");
const fetchGithubApi = require("./github");

const MIN_ANGLE = 20;
const MAX_ANGLE = 155;
const TOLERANCE = 27;

const UPDATE_INTERVAL = 5000;

const board = new five.Board();

board.on("ready", () => {
  // init servo on pin 10
  const servo = new five.Servo.Continuous(10);
  // init led on pin 4
  const led = new five.Led(4);

  // first round of updates
  updateBugOMeter(led, servo);

  // future updates
  setInterval(() => {
    updateBugOMeter(led, servo);
  }, UPDATE_INTERVAL);

  // move servo to its start position
  moveServo(servo, MIN_ANGLE);
});

const updateBugOMeter = async (led, servo) => {
  // show loading indicator
  led.on();

  const issues = await fetchGithubApi(
    "https://api.github.com/repos/mvdam/arduino-github/issues"
  );

  // loading has finished; lights off
  led.off();

  const angle = issues.length * TOLERANCE;
  moveServo(servo, angle);
};

const moveServo = (servo, angle) => {
  if (angle < MIN_ANGLE) {
    angle = MIN_ANGLE;
  }

  if (angle > MAX_ANGLE) {
    angle = MAX_ANGLE;
  }

  servo.to(angle);
};
