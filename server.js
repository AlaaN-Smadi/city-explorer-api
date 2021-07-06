'use strict';


const express = require('express');   //   import  server  requirments 

require('dotenv').config();  //   to  activate  .env  file 


const cors = require('cors');

const wheather = require('./data/wheather.json'); //  Local  Data  in JSON file


const server = express();  //   name  of  the  server,  to manage process
const PORT = process.env.PORT;  //  PORT  name  and  number 
server.use(cors());


//  Requests  &  Responses  //
//  wheather => link //  ?city=cityName => request  // 
server.get('/wheather', (req, res) => {


    let city = req.query.city.toLocaleLowerCase();

    // console.log(wheather[0])
    // console.log(req.query.city.toLocaleLowerCase())
    let cityInfo = wheather.filter((item) => {
        if (city === item.city_name.toLocaleLowerCase()) {
            return true
        }
    })
    let cityFinalInfo = cityInfo[0].data.map((item)=>{
        return item
    })
    res.send(cityFinalInfo)


})
//  Requests  &  Responses  //
server.get('*', (req, res) => {
    res.status(500).send('NOT FOUND')
})

server.listen(PORT, () => {  //   function  to  awake  Server 
    console.log(`Listening on PORT ${PORT}`);
})