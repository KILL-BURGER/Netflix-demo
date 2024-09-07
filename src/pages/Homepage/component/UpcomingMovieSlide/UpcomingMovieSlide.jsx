import React from "react";
import {Alert} from "react-bootstrap";
import MovieSlider from "../../../../common/movieSlider/MovieSlider";
import {responsive} from '../../../../constants/responsive';
import {useUpcomingMoviesQuery} from "../../../../hooks/useUpcomingMovies";

const UpcomingMovieSlide = () => {
    const {data, isLoading, isError, error} = useUpcomingMoviesQuery()
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return <div className={'m-5'}>
        <MovieSlider title={'Upcoming Movies'} movies={data.results} responsive={responsive}/>
    </div>;
}

export default UpcomingMovieSlide