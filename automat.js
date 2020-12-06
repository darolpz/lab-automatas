"use strict";
const { readTempture, getLocation } = require("./utils");
const fetch = require("node-fetch");
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
      if (tempt > 40) {
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
    const limit = 10;
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
    const ip = await getLocation();
    console.log("Calculation finished");
    this.moving(10);
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
    const time = 10 + Math.floor(Math.random() * 10) * 1000;
    setTimeout(() => {
      console.log("Interaction ended");
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
