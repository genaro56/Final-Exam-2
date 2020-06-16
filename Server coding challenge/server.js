const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const cors = require( './middleware/cors' );
const uuid = require('uuid');
const { Movies } = require('./models/moviedex-model');
const validateToken = require('./middleware/token-validation');
const app = express();

app.use( cors );

/* 
    Your code goes here 
*/
app.post('/api/add-movie/', [validateToken, jsonParser], (req, res) => {
    const { movie_title, movie_year, movie_rating } = req.body;
    if(!movie_title || !movie_year || !movie_rating) {
        return res.status(403).send('You need to send all movie fields to add the movie to the movie list')
    }
    const id = uuid.v4();
    Movies.createMovie({ id, movie_title, movie_year, movie_rating})
    .then(res => {
        if(res) {
            return res.status(201).json({
                movie: res
            })
        }
    })
    .catch(err => {
        throw new Error(err)
    })
})
app.get('api/movies/', validateToken, (req, res) => {
    return Movies.getMovies()
    .then(res => {
        if(res.length == 0) {
            return res.status(404).message('No movies found in the moviede')
        } else {
            return res.status(200).json({
                movies: res
            })
        }
    }).catch(err => {
        return err;
    })
})
app.listen( PORT, () => {
    console.log( `This server is running on port ${PORT}` );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});