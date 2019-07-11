const request = require('request')

const forecast = (lag, long, callback) => {
    const url = `https://api.darksky.net/forecast/1a9e97b4273baadcde40371bed117c5e/${lag},${long}`
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('not connection',undefined)
        } else if (body.error) {
            callback('Usable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out there. The high today is ${body.daily.data[0].temperatureHigh}. The low today is ${body.daily.data[0].temperatureLow}.  There is a ${body.currently.precipProbability} % chance of rain.` )
        }
    })
}

module.exports = forecast 