const request = require('request');
const forcast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=951e714f484d201f9408432b0f09fa10&query=${lat},${lon}`;

    request({url:url, json: true}, (error, response)=>{
        if(error){
            callback('111', undefined);
            }else if(response.body.error){
                callback(response.body.error, undefined)
            }else{
            let temperature = response.body.current.temperature;
            let feelslike = response.body.current.feelslike; 
            callback(undefined, response.body.current.weather_descriptions[0] + `. it\' currently ${temperature} degrees out, It feels like ${feelslike} degrees out.`)
            }
    })
}

module.exports = forcast;