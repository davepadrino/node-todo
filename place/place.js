const axios = require("axios");

const getPlaceLatLng = async (addressName) => {
  const encodedUrl = encodeURI(addressName);
  const instance = axios.create({
    baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
    headers: {
      "x-rapidapi-key": "4afbe9f724mshf8fe90d45f2243cp12d671jsnaf955bfc025d",
    },
  });

  const response = await instance.get();
  if (response.data.Results.length === 0) {
    throw new Error(`No results to ${addressName}`);
  }

  const { data } = response.data.Results[0];
  const address = data.name;
  const lat = data.lat;
  const lng = data.lon;

  return { address, lat, lng };
};

module.exports = { getPlaceLatLng };
