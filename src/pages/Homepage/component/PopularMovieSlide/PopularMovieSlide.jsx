import React from "react";
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import MovieSlider from "../../../../common/movieSlider/MovieSlider";
import {responsive} from '../../../../constants/responsive';

const PopularMovieSlide = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (<div className={'m-5'}>
        <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive}/>
    </div>);
};

export default PopularMovieSlide;