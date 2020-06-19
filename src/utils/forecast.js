const request = require('request')

const forecast = (latitude, longitude, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=f5116e8713e5f561638f1725997bfa5d&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            return callback('Unable to connect to weather service!')
        }
        else if (body.error) {
            return callback('Unable to find location!')
        }
        else {
            return callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                icon: body.current.weather_icons[0],
                description: body.current.weather_descriptions[0],
                wind_speed: body.current.wind_speed

            })
        }
    
    })
}

module.exports=forecast