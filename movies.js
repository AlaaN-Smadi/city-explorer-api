'use strict';
const axios = require('axios');


//  https://api.themoviedb.org/3/search/movie?api_key${process.env.MOVIE_API_KEY}=&query=cityName

const movieData = {}


async function handelMovie(req, res) {
    let cityName = req.query.city;

    let liveMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
    

    try {

        const searchMoviesLocally = localMovies.find(item=> item.city == cityName)
        if(searchMoviesLocally !== undefined){
            
            moviesArr = []
            searchMoviesLocally.movies.forEach(element => {
                new MoviesReturn(element)
            });
    
            console.log('data from local')
            res.send(moviesArr)
            
        }else{
            let liveMovieData = await axios.get(liveMovieUrl)

            let resendData = liveMovieData.data.results;
    
            moviesArr = []
            resendData.forEach(element => {
                new MoviesReturn(element)
            });
    
            new AvilableData(resendData, cityName)
    
            console.log('data from API')
            res.send(moviesArr)
    
        }

        // console.log(searchMoviesLocally)
        
    } catch {
        res.status(500).send("SomeThing Went Wrong !!")
    }

}



let moviesArr = []
class MoviesReturn {
    constructor(data) {
        this.title = data.title,
            this.release_date = data.release_date,
            this.popularity = data.popularity,
            this.vote_count = data.vote_count,
            this.vote_average = data.vote_average,
            this.overview = data.overview,
            this.poster_path = data.poster_path

            moviesArr.push(this)
    }
}


const localMovies = []
class AvilableData{
    constructor(movies, city){
        this.movies = movies,
        this.city = city

        localMovies.push(this)
    }
}




module.exports = handelMovie