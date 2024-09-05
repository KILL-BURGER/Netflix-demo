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
    const keyword = query.get('q');
    const {data, isLoading, isError, error}
        = useSearchMovieQuery({keyword, page});
    const {data: genreData} = useMovieGenreQuery();
    const [selectedSort, setSelectedSort] = useState('정렬기준');
    const [selectedGenre, setSelectedGenre] = useState('장르별 검색');

    let currentPage = data?.page;

    let movieList = data?.results;
    const [filterList, setFilterList] = useState([]);
    if (filterList.length !== 0) {
        movieList = filterList;
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    // 인기 많은순
    const popularListDesc = () => {
        if (movieList.length > 0 && movieList[0] !== '😭 검색한 결과가 없습니다..!') {
            movieList.sort((a, b) => b.popularity - a.popularity);
        }
    }
    // 인기 적은순
    const popularListAsc = () => {
        if (movieList.length > 0 && movieList[0] !== '😭 검색한 결과가 없습니다..!') {
            movieList.sort((a, b) => a.popularity - b.popularity);
        }
    }

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
                    {selectedSort}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                        setSelectedSort('인기 많은순');
                        popularListDesc();
                    }}>인기 많은순</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                        setSelectedSort('인기 적은순');
                        popularListAsc();
                    }}>인기 적은순</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                    {selectedGenre}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {genreData.map((genre, index) => (
                        <Dropdown.Item key={index} onClick={() => {
                            setSelectedGenre(genre.name);
                            let filter = data?.results
                                .filter(movie => movie.genre_ids.includes(genre.id));
                            filter.length > 0
                                ? setFilterList(filter)
                                : setFilterList(['😭 검색한 결과가 없습니다..!']);
                        }}>
                            {genre.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>

        {/* 카드 리스트 */}
        <Row>
            {
                movieList.length > 0 && movieList[0] !== '😭 검색한 결과가 없습니다..!'
                    ? movieList.map((movie, index) => (
                        <Col key={index} lg={3} xs={6}>
                            <MovieCard movie={movie}/>
                        </Col>
                    )) : <h1 style={{textAlign: "center"}}>😭 검색한 결과가 없습니다..!</h1>
            }
        </Row>

        {/* 페이지 네이션 */}
        <div className={'d-flex justify-content-center my-4'}>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={movieList[0] === '😭 검색한 결과가 없습니다..!' ? 0 : 2}
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
                forcePage={currentPage - 1}
            />
        </div>

    </Container>);
};

export default MoviePage;