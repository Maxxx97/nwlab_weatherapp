const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options('address')
.argv;

const addr = argv.address;

const locationReq =`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyA9HmIKh3Yv-T9zS_JxjMZb8ZpEOpq7AtQ`;

axios.get(locationReq).then((response) => {
  console.log(response.data.results[0].formatted_address);
  const lat=response.data.results[0].geometry.location.lat;
  const lng=response.data.results[0].geometry.location.lng;
  const weatherReq =`https://api.darksky.net/forecast/5c72d056589f6679d1b98157880b91ca/${lat},${lng}`;
  return axios.get(weatherReq);

}).then((response) =>{
  console.log(response.data.currently.summary);
  const temp =(response.data.currently.temperature -32)*0.5556;
  const temperature = temp.toFixed(2);
  console.log(`${temperature}Celsius`);

})
.catch((error) =>{
  console.log(error.code);
});
