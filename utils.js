const MLX90614 = require("mlx90614");
const fetch = require("node-fetch");

async function readTempture() {
  const sensor = new MLX90614();
  try {
    const temp = await sensor.readObjectSync();
    return temp;
  } catch (err) {
    console.error("Error trying to read temp", err);
  }
}

async function getLocation() {
  try {
    const url = "http://ip-api.com/json/";

    const res = await (await fetch(url)).json();
    return {
      lat: Math.round(res.lat * 100) / 100,
      lon: Math.round(res.lon * 100) / 100,
    };
  } catch (err) {
    console.error("Error trying to get location", err);
  }
}

function getClosetRobot() {
  const inf = Infinity;
  const matrix = [
    [inf, 3, 9, 7.5, 12.5, 15, 22, 20.3, 23.05, 26.05],
    [inf, inf, 6, 4.5, 9.5, 12, 19, 17.3, 20.25, 23.05],
    [inf, 6.5, inf, 2, 7, 9.5, 16.5, 14.8, 17.55, 20.55],
    [inf, 4.5, 2, inf, 5, 7.5, 14.5, 12.8, 15.55, 18.55],
    [inf, 9.5, 7, 5, inf, 2.5, 9.5, 7.8, 10.55, 13.55],
    [inf, inf, inf, inf, inf, inf, 7, 5.3, 8.05, 11.05],
    [inf, inf, inf, inf, inf, inf, inf, 6, 3.75, 8],
    [inf, inf, inf, inf, inf, inf, 6, inf, 2.75, 5.75],
    [inf, inf, inf, inf, inf, inf, 8.75, 2.75, inf, 4.25],
    [inf, inf, inf, inf, inf, inf, 11.75, 5.75, 8.5, inf],
  ];

  const distances = matrix[process.env.POSITION - 1];
  //Emulando probabilidad de que este ocupado
  for (let i = 0; i < distances.length; i++) {
    const random = Math.floor(Math.random() * 10);
    const freeProb = process.env.FREE_PROB / 10;
    if (random >= freeProb) {
      // console.log(`Robot ${i + 1} is busy`);
      distances[i] = inf;
    }
  }
  const min = Math.min(...distances);
  const robot = distances.indexOf(min) + 1;
  return { robot: robot, distance: min };
}
module.exports = {
  readTempture,
  getLocation,
  getClosetRobot,
};
