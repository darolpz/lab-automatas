"use strict";
const MLX90614 = require("mlx90614");

module.exports = class Automat {
  actualTimer;
  constructor() {
    this.states = [
      "REPOSING",
      "COOKING",
      "CALCULATING",
      "MOVING",
      "INTERACTING",
      "RETURNING",
      "ENDED",
    ];
    this.status = this.states[0];
    this.actualTimer = null;
  }

  run() {
    const automaton = this;
    this.actualTimer = setInterval(async () => {
      const tempt = await automaton.readTempture();
      if (tempt > 40) {
        automaton.status = automaton.states[1];
        clearInterval(automaton.actualTimer);
      }
    }, 1000);
    console.log("Finished", this.status);
  }

  async readTempture() {
    const sensor = new MLX90614();
    try {
      const temp = await sensor.readObjectSync();
      return temp;
    } catch (err) {
      console.error("Error trying to read temp", err);
    }
  }
};
