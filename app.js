const argv = require("yargs").options({
  address: {
    alias: "d",
    description: "City address",
    demand: true,
  },
}).argv;
const place = require("./place/place");
const weather = require("./weather/weather");

const getInfo = async (address) => {
  try {
    const coords = await place.getPlaceLatLng(address);
    const temp = await weather.getWeather(coords.lat, coords.lng);
    return `Weather from ${coords.address} is ${temp}`;
  } catch (error) {
    return `Error: ${error}`;
  }
};

getInfo(argv.address).then(console.log).catch(console.log);
