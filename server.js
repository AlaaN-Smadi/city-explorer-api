'use strict';


const express = require('express');   //   import  server  requirments 

require('dotenv').config();  //   to  activate  .env  file 

const cors = require('cors');
const axios = require('axios');

const wheather = require('./data/wheather.json'); //  Local  Data  in JSON file
const handelMovie = require('./movies');
const handelWeatherRequest = require('./Weather')

const server = express();  //   name  of  the  server,  to manage process
const PORT = process.env.PORT;  //  PORT  name  and  number 
server.use(cors());



//  Requests  &  Responses  //
server.get('/wheather', handelWeatherRequest);
server.get('/movies', handelMovie);


// //  wheather => link //  ?city=cityName => request  // 
// server.get('/wheatherJSON', (req, res) => {


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
//     // let myResultData = new Forecast(cityFinalInfo)
//     console.log(cityFinalInfo)
//     res.send(cityFinalInfo)


// })

//   https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh&key=API_KEY
//   KEY = 32293cc6a94649758d8714d7337ea5bb

//  wheather => link //  ?city=cityName => request  // My frontEnd





//  Requests  &  Responses  //
server.get('*', (req, res) => {
    res.status(500).send('NOT FOUND')
})

server.listen(PORT, () => {  //   function  to  awake  Server 
    console.log(`Listening on PORT ${PORT}`);
})