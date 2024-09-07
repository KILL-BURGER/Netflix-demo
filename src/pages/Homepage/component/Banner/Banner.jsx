import React from "react";
import {usePopularMoviesQuery} from "../../../../hooks/usePopularMovies";
import {Alert} from "react-bootstrap";
import './Banner.style.css';
import YouTubeModal from "../Modal/YouTubeModal";
import {useMovieVideosQuery} from "../../../../hooks/useMovieVideos";

const Banner = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery();
    const id = data?.results[0].id;
    const {
        data: videos,
        isLoading: videosLoading,
        isError: videosIsError,
        error: videosError
    } = useMovieVideosQuery({id});
    if (isLoading) {
        return <h1>Loading...!</h1>;
    }
    if (isError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }
    if (videosLoading) {
        return <h1>Loading...!</h1>;
    }
    if (videosIsError) {
        return <Alert variant={'danger'}>{error.message}</Alert>
    }

    const video = videos.results[0].key;
    return <div style={{
        backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}` +
            ")"
    }} className={'banner'}>
        <div className={'text-white banner-text-area px-5'}>
            <h1 className={'banner-text-title'}>{data?.results[0].title}</h1>
            <p className={'banner-text-overview'}>{data?.results[0].overview}</p>
            <div className={'video-area'}>
                <YouTubeModal video={video}/>
            </div>
        </div>
    </div>;
};

export default Banner;