const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxleGNoZW43NyIsImEiOiJjazlnMzVrcDgwam1vM2lxYmtwYXp5ZmVhIn0.NaXRv7Pec4MSThDzVbAUoQ&limit=1`;

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find location, Try another search', undefined)
        }else{
            callback(undefined, {
                lat: response.body.features[0].geometry.coordinates[0],
                lon: response.body.features[0].geometry.coordinates[1],
                loc: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode