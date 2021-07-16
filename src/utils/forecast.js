const request=require('request');

const forecast = (long, lat, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=2c2c6a66c0a552a124fa1870bbb82e92&query="+long+","+lat

    request({url:url,json:true},(error,response)=>{

        if(error){
            callback("Cannot fetch data from API!!",undefined)
        }
        else if(response.body.error){
            callback("Cannot find location",undefined)
        }
        else{
            callback(undefined,(response.body.current.weather_descriptions[0]))
        }

    })
}

module.exports = forecast;