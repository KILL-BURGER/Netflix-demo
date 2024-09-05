import React from "react";
import {useRelatedMoviesQuery} from "../../../../hooks/useRelatedMovie";
import {Alert} from "react-bootstrap";
import {responsive} from "../../../../constants/responsive";
import MovieSlider from "../../../../common/movieSlider/MovieSlider";
import {useParams} from "react-router-dom";

const RelatedMoviesSlide = () => {
    const {id} = useParams();
    const {data, isLoading, isError, error} = useRelatedMoviesQuery({id});
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    return (<div>
        <MovieSlider title='Related Movies' movies={data.results} responsive={responsive}/>
    </div>);
}

export default RelatedMoviesSlide;