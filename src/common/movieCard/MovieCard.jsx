import React from "react";
import {Badge} from "react-bootstrap";
import './MovieCard.style.css';
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";

const MovieCard = ({movie}) => {
    const {data: genreData} = useMovieGenreQuery();

    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        return genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj.name;
        });
    };

    return <div style={{
        backgroundImage: "url("
            + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
            + ")"
    }} className={'movie-card'}>
        <div className={'overlay'}>
            <h3>{movie.title}</h3>
            {showGenre(movie.genre_ids).map((id, index) =>
                <Badge bg={'danger'} key={index} className={'me-1'}>{id}</Badge>)}
            <div className={'movie-card-info'}>
                <div>평점: {movie.vote_average}</div>
                <div>인지도: {Math.floor(Number(movie.popularity))}</div>
                <div>상영등급: {movie.adult ? '성인' : '19세미만 상영가능'}</div>
            </div>
        </div>
    </div>;
}

export default MovieCard;