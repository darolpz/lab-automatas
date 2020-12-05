"use strict";
const MLX90614 = require("mlx90614");

module.exports = class Automat {
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
  }

  run() {
    const automaton = this;
    setInterval(async () => {
      const tempt = await automaton.readTempture();
      if (tempt > 40) {
        automaton.status = states[1];
        clearInterval(this);
      }
    }, 1000);
    console.log("Finished", this.status);
  }

  async readTempture() {
    const sensor = new MLX90614();
    try {
      const temp = await sensor.readObject();
      return temp;
    } catch (err) {
      console.error("Error trying to read temp", err);
    }
  }
};
