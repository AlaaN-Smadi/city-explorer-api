'use strict';

//   https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh&key=API_KEY
//   KEY = 32293cc6a94649758d8714d7337ea5bb
const axios = require('axios');

//  wheather => link //  ?city=cityName => request  // My frontEnd
async function  handelWeatherRequest(req,res){
    let cityName = req.query.city;

    let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`
    try{
        let liveWeatherData = await axios.get(liveWeatherUrl)

        let resendData = liveWeatherData.data.data[0];

        let cityWeather = new weatherReturn(resendData)
        // console.log(cityWeather)
        res.send(cityWeather)

    }catch{
        res.status(500).send("SomeThing Went Wrong !!")
    }
    
}



const weatherArr = []
class weatherReturn {
    constructor(data){
        this.datetime = data.datetime,
        this.max_temp = data.max_temp,
        this.low_temp = data.low_temp,
        this.description = data.weather.description


        weatherArr.push(this)
    }
}



module.exports = handelWeatherRequest