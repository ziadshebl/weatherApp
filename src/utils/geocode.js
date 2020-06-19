const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiemlhZHNoZWJsIiwiYSI6ImNrYmpqbGpmcjBvcXUydG15Y2xsM2VzemMifQ.EJvl1CfvMd1iZtff9jWusw&limit=1'
    request({url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.message) {
            callback(body.message)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location!')
        }
        else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}
module.exports = geoCode