const MLX90614 = require('mlx90614-driver');
const sensor = new MLX90614();


function getTemp() {
  sensor.readObject((err, temp) => {
      if (err != null) throw err;
      console.log('Object:', temp);
  });

  sensor.readAmbient((err, temp) => {
      if (err != null) throw err;
      console.log('Ambient:', temp);
  });
}

setInterval(getTemp, 1000);