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
  const url = "http://ip-api.com/json/";
  const res = await (await fetch(url)).json();
  return { lat: res.lat, lon: res.lon };
}
module.exports = {
  readTempture,
  getLocation,
};
