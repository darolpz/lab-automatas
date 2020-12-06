"use strict";
const readTempture = require("./utils");
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
    this.reposing();
  }

  async reposing() {
    console.log("Reposing");
    const automaton = this;
    this.actualTimer = setInterval(()=>{
      const tempt = await readTempture();
      if (tempt > 40) {
        automaton.status = automaton.states[1];
        clearInterval(automaton.actualTimer);
        console.log("Finishing repose...");
        cooking();
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
      }
      
      seconds++;
    }, 1000);
  }
};
