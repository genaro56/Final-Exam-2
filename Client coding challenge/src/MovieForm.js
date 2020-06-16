import React, { useRef } from 'react';

function MovieForm(props) {
    const yearReference = useRef()
    const titleReference = useRef()
    const ratingReference = useRef()
    return (
        <div className="moviesForm">
            <h3>Create a movie!</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                const movie = {
                    year: yearReference,
                    rating: ratingReference,
                    title: titleReference,
                }
                props.onSubmit(movie)
            }}>
                <label>
                    Movie Title:
                <input name="title" type="text" ref={titleReference} />
                </label>
                <label>
                    Rating:
                    <input name="rating" ref={ratingReference} />
                </label>
                <label>
                    Year
                    <input name="year" ref={yearReference} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MovieForm;