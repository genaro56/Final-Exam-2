import React from 'react';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      results: [],
      loading: false,
      error: ''
    }
    this.onCreateMovie = this.onCreateMovie.bind(this)
  }
  async onCreateMovie(movie) {
    const options = {
      method: "POST",
      body: { ...movie }
    }
    fetch('/api/add-movie/', options)
    .then((res) => {
      if(!res) {
        this.setState({
          error: 'movie was not created'
        })
      } else {
        console.log('movie created')
        // return await this.getAllMovies()
      }
    })
  }
  getAllMovies(){
    const options = {
      method: "GET",
    }
    fetch('/api/movies/', options)
    .then(res => {
      if(!res || !res.movies || res.movies.length === 0) {
        this.setState({
          error: 'no movies found'
        })
      } else {
        this.setState({
          results: res.movies,
          error: ''
        })
      }
    })
  }
  componentWillMount() {
    this.getAllMovies();
  }
  componentDidMount(){}

  render(){
    const { results, loading } = this.state;
    return (
      <div>
        <MovieForm onSubmit={this.onCreateMovie} />
        {!loading && results.map(movie => 
          <Movie
          title={movie.movie_title}
          rating={movie.movie_rating}
          year={movie.movie_year}
          />  
        )}
        {this.state.error && <span>{this.state.error}</span>}
      </div>
    );
  }
}

export default App;
