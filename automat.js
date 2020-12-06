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
    const automaton = this;
    this.actualTimer = setInterval(async () => {
      const tempt = await readTempture();
      if (tempt > 40) {
        automaton.status = automaton.states[1];
        clearInterval(automaton.actualTimer);
        console.log("Finishing repose...");
        automaton.cooking();
      }
    }, 1000);
  }

  async cooking() {
    console.log("Start to cooking");
    const automaton = this;
    let seconds = 0;
    const limit = 10;
    this.actualTimer = setInterval(() => {
      console.log(`I've been cooking for ${seconds} seconds`);
      if (seconds == limit) {
        clearInterval(automaton.actualTimer);
        console.log("Finishing cooking");
        automation.calculating();
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
    const automaton = this;
    const speed = process.env.SPEED;
    const time = (distance / speed) * 1000;
    setTimeout(() => {
      console.log("Position reached.");
      automaton.interacting();
    }, time);
  }

  async interacting(distance) {
    console.log("Interacting...");
    const automaton = this;
    const time = 10 + Math.floor(Math.random() * 10) * 1000;
    setTimeout(() => {
      console.log("Interaction ended");
      automaton.returning(distance);
    }, time);
  }

  async returning(distance) {
    console.log("Coming back");
    const automaton = this;
    const speed = process.env.SPEED;
    const time = (distance / speed) * 1000;
    setTimeout(() => {
      console.log("Position reached.");
      automaton.reposing();
    }, time);
  }
};
