const MLX90614 = require("mlx90614");

async function readTempture() {
  const sensor = new MLX90614();
  try {
    const temp = await sensor.readObjectSync();
    return temp;
  } catch (err) {
    console.error("Error trying to read temp", err);
  }
}

module.exports = {
  readTempture,
};
