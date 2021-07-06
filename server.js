'use strict';


const express = require('express');   //   import  server  requirments 

require('dotenv').config();  //   to  activate  .env  file 

const cors = require('cors');
const axios = require('axios');

const wheather = require('./data/wheather.json'); //  Local  Data  in JSON file


const server = express();  //   name  of  the  server,  to manage process
const PORT = process.env.PORT;  //  PORT  name  and  number 
server.use(cors());


//  Requests  &  Responses  //
server.get('/wheather', handelRequest);
server.get('/movies', handelMovie);
//  wheather => link //  ?city=cityName => request  // 
// server.get('/wheather', (req, res) => {


//     let city = req.query.city.toLocaleLowerCase();

//     // console.log(wheather[0])
//     // console.log(req.query.city.toLocaleLowerCase())
//     let cityInfo = wheather.filter((item) => {
//         if (city === item.city_name.toLocaleLowerCase()) {
//             return true
//         }
//     })
//     let cityFinalInfo = cityInfo[0].data.map((item)=>{
//         return item
//     })
//     res.send(cityFinalInfo)


// })

//   https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh&key=API_KEY
//   KEY = 32293cc6a94649758d8714d7337ea5bb

//  wheather => link //  ?city=cityName => request  // My frontEnd
async function  handelRequest(req,res){
    let cityName = req.query.city;

    let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`
    try{
        let liveWeatherData = await axios.get(liveWeatherUrl)

        let resendData = liveWeatherData.data.data[0];

        res.send(resendData)

    }catch{
        res.status(500).send("SomeThing Went Wrong !!")
    }
    
}

//  https://api.themoviedb.org/3/search/movie?api_key${process.env.MOVIE_API_KEY}=&query=cityName

async function  handelMovie(req,res){
    let cityName = req.query.city;

    let liveMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
    try{
        let liveMovieData = await axios.get(liveMovieUrl)

        let resendData = liveMovieData.data.results;

        res.send(resendData)

    }catch{
        res.status(500).send("SomeThing Went Wrong !!")
    }
    
}


//  Requests  &  Responses  //
server.get('*', (req, res) => {
    res.status(500).send('NOT FOUND')
})

server.listen(PORT, () => {  //   function  to  awake  Server 
    console.log(`Listening on PORT ${PORT}`);
})