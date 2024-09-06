import React from "react";
import {Badge} from "react-bootstrap";
import './MovieCard.style.css';
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";
import {Link, useNavigate} from "react-router-dom";

const MovieCard = ({movie}) => {
    const {data: genreData} = useMovieGenreQuery();
    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        return genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj.name;
        });
    };

    /*
        어떤 이유인지는 모르겠지만 디테일 페이지에서 -> 디테일 페이지로 넘어가질 못한다.
        Link 태그도 안된다.
        그래서 대체로 <a> 태그 사용 버그 고치는 법을 알게되면 useNavigate() 로 고치자.
    * */
    const navigate = useNavigate();
    const showDetailMovie = () => {
        console.log(`showDetailMovie 호출 ${movie.id}`);
        navigate(`/movies/${movie.id}`);
    }

    return <div style={{
        backgroundImage: "url("
            + `https://media.themoviedb.org/t/p/w220_and_h330_bestv2${movie.poster_path}`
            + ")"
    }} className={'movie-card'}>
        <a href={`/movies/${movie.id}`} style={{textDecoration: "none", color: "inherit"}}>
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
        </a>
    </div>;
}

export default MovieCard;