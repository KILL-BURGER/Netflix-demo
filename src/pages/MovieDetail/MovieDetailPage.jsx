import React from "react";
import {useMovieDetailQuery} from "../../hooks/useMovieDetail";
import {useParams} from "react-router-dom";
import {Alert, Col, Row, Spinner} from "react-bootstrap";
import RelatedMoviesSlide from "../Homepage/component/RelatedMoviesSlide/RelatedMoviesSlide";
import {useMovieReviewsQuery} from "../../hooks/useMovieReview";
import YouTubeModal from "../Homepage/component/Modal/YouTubeModal";
import {useMovieVideosQuery} from "../../hooks/useMovieVideos";
import ContentBox from "../../common/ContentBox/ContentBox";
import './MovieDetailPage.style.css';

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
            <Row>
                <Col className={'col-12 text-center'}>
                    <div className={'img-section m-auto'}>
                        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path}`}
                             alt={'영화 포스터'}
                             className={'img-large'}/>
                    </div>
                </Col>
                <Col className={'w-20 col-12'}>
                    <div className={'info-section'}>
                        <div className={'d-flex'}>
                            {data?.genres.map((item, key) => {
                                return <div className={'genres mt-5'}>{item.name}</div>
                            })}
                        </div>
                        <div className={'mt-3'}>
                            <h1>{data?.title}</h1>
                            <h4>{data?.tagline}</h4>
                            <div className={'info'}>
                                <div>
                                    <span className={'span-style'}>평점:</span> {Math.floor(data?.vote_average * 10) / 10}
                                </div>
                                <div>
                                    <span className={'span-style'}>인지도:</span> {Math.floor(data?.popularity)}
                                </div>
                                <div>
                                    <span className={'span-style'}>상영등급:</span> {data?.adult ? '성인' : '청소년 가능'}
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <p>{data?.overview}</p>
                        <hr/>
                        <div>
                            <div><span className={'span-style'}>제작비용:</span> ${data?.budget.toLocaleString()}</div>
                            <div><span className={'span-style'}>영화수익:</span> ${data?.revenue.toLocaleString()}</div>
                            <div><span className={'span-style'}>개봉일:</span> {data?.release_date}</div>
                            <div><span className={'span-style'}>상영시간:</span> {data?.runtime}분</div>
                        </div>
                        <div className={'mt-4 mb-4'}>
                            <YouTubeModal title={title} video={video}/>
                        </div>
                    </div>
                </Col>
            </Row>

            <hr/>
            <div className={'related-movies'}>
                <RelatedMoviesSlide id={id}/>
            </div>

            <hr/>
            <div className={'review-section'}>
                <h3>Reviews</h3>
                {reviewList.map((item, index) => {
                    return <div className={'review-content mt-3'} key={index}>
                        <h5>{item.author}</h5>
                        <ContentBox content={item.content}/>
                    </div>
                })}
            </div>
        </div>
    );
};

export default MovieDetailPage;