const mongoose = require( 'mongoose' );

const MoviesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    movie_title: {
        type: String,
        required: true
    },
    movie_year: {
        type: Number,
        required:true
    },
    movie_rating: {
        type: Number,
        required: true,
    }
})
const moviesCollection = mongoose.model('movies', MoviesSchema);

const Movies = {
    createMovie: function(movie) {
        return moviesCollection
        .create(movie)
        .then(res => {
            return res
        })
        .catch(err => {
            throw new Error(err)
        })
    },
    getMovies: function() {
        return moviesCollection
        .find()
        .then(allMovies => {
            return allMovies;
        })
        .catch(err => {
            throw new Error(err)
        })
    }
}
/* 
    Your code goes here 
*/

module.exports = {
    Movies
};