var five = require("johnny-five");
const board = new five.Board();

board
  .on("ready", () => {
    const led = new five.Led(4);
    led.blink(1500);
  })
  .on("error", err => {
    console.error("failed!", err);
    process.exit(1);
  });
