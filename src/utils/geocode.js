const request=require('request');

const geocode = (address, callback) =>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ3VydWNoZWxhIiwiYSI6ImNrbzl2ZGMyeDB5aHMydm1xMGVrajJqb2IifQ.h4LmlRLsykU_g48qGEqLgQ&limit=1"

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Cannot fetch data from API!!",undefined)
        }
        else if(response.body.features.length===0){
            callback("Cannot find location. Please try again!!", undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;