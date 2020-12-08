"use strict";
const { readTempture, getLocation, getClosetRobot } = require("./utils");
module.exports = class Automat {
  constructor() {
    this.actualTimer = null;
  }

  run() {
    this.reposing();
  }

  async reposing() {
    console.log("Reposing");
    const automat = this;
    this.actualTimer = setInterval(async () => {
      const tempt = await readTempture();
      if (tempt > process.env.COOKING_TEMP) {
        clearInterval(automat.actualTimer);
        console.log("Finishing repose...");
        automat.cooking();
      }
    }, 1000);
  }

  async cooking() {
    console.log("Start to cooking");
    const automat = this;
    let seconds = 0;
    const limit = process.env.COOKING_TIME;
    this.actualTimer = setInterval(() => {
      console.log(`I've been cooking for ${seconds} seconds`);
      if (seconds == limit) {
        clearInterval(automat.actualTimer);
        console.log("Finishing cooking");
        automat.calculating();
      }
      seconds++;
    }, 1000);
  }

  async calculating() {
    console.log("Calculating");
    const location = await getLocation();
    console.log(`Own location: (${location.lat},${location.lon})`);
    const { robot, distance } = getClosetRobot();
    console.log(
      `Calculation finished, going to robot ${robot} (${location.lat}, ${
        location.lon + distance
      }), distance ${distance}`
    );
    this.moving(distance);
  }

  async moving(distance) {
    console.log("Moving...");
    const automat = this;
    const speed = process.env.SPEED;
    const time = (distance / speed) * 1000;
    setTimeout(() => {
      console.log("Position reached.");
      automat.interacting();
    }, time);
  }

  async interacting(distance) {
    console.log("Interacting...");
    const automat = this;
    const time =
      process.env.MIN_INT_TIME + Math.floor(Math.random() * 10) * 1000;
    setTimeout(() => {
      console.log(`Interaction ended after ${time} seconds`);
      automat.returning(distance);
    }, time);
  }

  async returning(distance) {
    console.log("Coming back");
    const automat = this;
    const speed = process.env.SPEED;
    const time = (distance / speed) * 1000;
    setTimeout(() => {
      console.log("Position reached.");
      automat.reposing();
    }, time);
  }
};
