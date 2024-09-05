import React from "react";
import {useMovieDetailQuery} from "../../hooks/useMovieDetail";
import {useParams} from "react-router-dom";
import {Alert, Spinner} from "react-bootstrap";
import RelatedMoviesSlide from "../Homepage/component/RelatedMoviesSlide/RelatedMoviesSlide";
import {useMovieReviewsQuery} from "../../hooks/useMovieReview";
import YouTubeModal from "../Homepage/component/Modal/YouTubeModal";
import {useMovieVideosQuery} from "../../hooks/useMovieVideos";

const MovieDetailPage = () => {
    const {id} = useParams();
    const {data, isLoading, isError, error}
        = useMovieDetailQuery({id});
    const {
        data: reviews, isLoading: reviewsLoading,
        isError: reviewsIsError,
        error: reviewError
    } = useMovieReviewsQuery({id});
    const {
        data: videos,
        isLoading: videosLoading,
        isError: videosIsError,
        error: videosError
    } = useMovieVideosQuery({id});
    if (isLoading) {
        return (
            <div className={'spinner-area'}>
                <Spinner
                    animation={'border'}
                    variant={'danger'}
                    style={{width: '5rem', height: '5rem'}}
                />
            </div>
        )
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>
    }
    if (reviewsLoading) {
        return (
            <div className={'spinner-area'}>
                <Spinner
                    animation={'border'}
                    variant={'danger'}
                    style={{width: '5rem', height: '5rem'}}
                />
            </div>
        )
    }
    if (reviewsIsError) {
        return <Alert variant={"danger"}>{error.message}</Alert>
    }
    if (videosLoading) {
        return (
            <div className={'spinner-area'}>
                <Spinner
                    animation={'border'}
                    variant={'danger'}
                    style={{width: '5rem', height: '5rem'}}
                />
            </div>
        )
    }
    if (videosIsError) {
        return <Alert variant={"danger"}>{error.message}</Alert>
    }

    let reviewList = reviews?.results;
    const title = data?.title;
    const video = videos.results[0].key;

    return (
        <div className={'container'}>

            <div className={'movie-detail m-5'}>
                <div className={'img-section'}>
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`}
                         alt={'영화 포스터'}/>
                </div>
                <YouTubeModal title={title} video={video}/>
                <div className={'info-section'}>
                    {data?.genres.map((item, key) => {
                        return <div className={'genres'}>{item.name}</div>
                    })}
                    <h1>{data?.title}</h1>
                    <h4>{data?.tagline}</h4>
                    <p>평점: {Math.floor(data?.vote_average * 10) / 10} 인지도: {data?.popularity} {data?.adult ? '성인' : '19세 미만 상영가능'}</p>
                    <hr/>
                    <p>{data?.overview}</p>
                    <hr/>
                    <div>
                        <div>Budget ${data?.budget.toLocaleString()}</div>
                        <div>Revenue ${data?.revenue.toLocaleString()}</div>
                        <div>Release Date {data?.release_date}</div>
                        <div>Run Time {data?.runtime}분</div>
                    </div>
                </div>

            </div>

            <div className={'related-movies m-5'}>
                <RelatedMoviesSlide id={id}/>
            </div>

            <div className={'review-section m-5'}>
                <h3>Reviews</h3>
                {reviewList.map((item, index) => {
                    return <div className={'review-content mt-5'} key={index}>
                        <h5>{item.author}</h5>
                        <div>
                            {item.content}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default MovieDetailPage;