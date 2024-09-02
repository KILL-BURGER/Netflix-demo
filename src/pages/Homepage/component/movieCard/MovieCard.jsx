import React from "react";
import {Badge} from "react-bootstrap";
import './MovieCard.style.css';

const MovieCard = ({movie}) => {
    return <div style={{
        backgroundImage: "url("
            + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
            + ")"
    }} className={'movie-card'}>
        <div className={'overlay'}>
            <h3>{movie.title}</h3>
            {movie.genre_ids.map((id, index) => <Badge bg={'danger'} key={index}
                                                       style={{marginRight: "5px", marginBottom: "10px"}}>{id}</Badge>)}
            <div className={'movie-card-info'}>
                <div>평점: {movie.vote_average}</div>
                <div>인지도: {Math.floor(Number(movie.popularity))}</div>
                <div>상영등급: {movie.adult ? '성인' : '19세미만 상영가능'}</div>
            </div>
        </div>
    </div>;
}

export default MovieCard;