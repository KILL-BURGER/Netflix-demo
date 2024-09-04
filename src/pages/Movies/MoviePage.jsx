import React, {useState} from "react";
import './MoviePage.style.css';
import {useSearchMovieQuery} from "../../hooks/useSearchMovie";
import {useSearchParams} from "react-router-dom";
import {Alert, Col, Container, Dropdown, Row, Spinner} from "react-bootstrap";
import MovieCard from "../../common/movieCard/MovieCard";
import ReactPaginate from "react-paginate";
import {useMovieGenreQuery} from "../../hooks/useMovieGenre";

// 경로 2가지
// 1. nav 바에서 클릭해서 온경우 => popularMovie 보여주기
// 2. keyword 입력해서 온경우 => keyword 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie 에 page 까지 넣어서 fetch
const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const handlePageClick = ({selected}) => {
        setPage(selected + 1);
    }
    const keyword = query.get('q');

    const {data, isLoading, isError, error}
        = useSearchMovieQuery({keyword, page});
    const {data: genreData} = useMovieGenreQuery();
    console.log('data', data);

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

    return (<Container>
        {/* 드롭다운 박스 */}
        <div className={'d-flex my-4'}>
            <Dropdown className={'me-3'}>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    정렬기준
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">인기 많은순</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">인기 적은순</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    장르별 검색
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {genreData.map((genre, index) => (
                        <Dropdown.Item key={index}>
                            {genre.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <Row>
            {data?.results.length > 0 ? data?.results.map((movie, index) => (
                <Col key={index} lg={2} xs={12}>
                    <MovieCard movie={movie}/>
                </Col>
            )) : <h1 style={{textAlign: "center"}}>😭 검색한 결과가 없습니다..!</h1>}
        </Row>

        {/* 페이지 네이션 */}
        <div className={'d-flex justify-content-center my-4'}>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={0}
                pageCount={data.total_pages} // 전체페이지
                previousLabel="<"
                pageClassName="r-page-item"
                pageLinkClassName="r-page-link"
                previousClassName="r-page-item"
                previousLinkClassName="r-page-link"
                nextClassName="r-page-item"
                nextLinkClassName="r-page-link"
                breakLabel="..."
                breakClassName="r-page-item"
                breakLinkClassName="r-page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
            />
        </div>

    </Container>);
};

export default MoviePage;