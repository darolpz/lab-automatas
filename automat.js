'use strict'
const MLX90614 = require('mlx90614');

module.exports = class Automat{

  constructor(){
    this.states = ["REPOSING","COOKING","CALCULATING","MOVING","INTERACTING","RETURNING","ENDED"]
    this.status = this.states[0]
  }

  run(){
    while (this.status != this.states[6]){
      switch (this.status){
        case this.states[0]: {
          const automaton = this
          setInterval(async ()=>{
            console.log('POINT')
            const tempt = await automaton.readTempture()
            console.log(tempt)
            if (tempt > 40){
              automaton.status = states[1]
            }
          },1000)
          break
        }
        case this.states[1]:{
          console.log("COOKING")
          break
        }
      }
    }
  }

  async readTempture(){
    const sensor = new MLX90614();
    try{
      const temp = await sensor.readObject()
      return temp
    }catch(err){
      console.error("Error trying to read temp",err)
    }
  }
}
