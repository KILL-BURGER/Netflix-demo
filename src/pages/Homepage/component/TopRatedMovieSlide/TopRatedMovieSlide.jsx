import React from "react";
import {Alert} from "react-bootstrap";
import MovieSlider from "../../../../common/movieSlider/MovieSlider";
import {responsive} from "../../../../constants/responsive";
import {useTopRatedMoviesQuery} from "../../../../hooks/useTopRatedMovies";

const TopRatedMovieSlide = () => {
    const {data, isLoading, isError, error} = useTopRatedMoviesQuery()
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (<div>
        <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive}/>
    </div>);
}

export default TopRatedMovieSlide;