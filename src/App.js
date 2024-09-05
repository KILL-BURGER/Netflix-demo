import AppLayout from "./layout/AppLayout";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import MoviePage from "./pages/Movies/MoviePage";
import React from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// 홈페이지 /
// 영화 전체보여주는 페이지(서치) /movie
// 영화 디테일 페이지 /movies/:id
// 추천영화 /movie/:id/recommendation
// 리뷰 /movies/:id/reviews
function App() {
    return (
        <Routes>
            <Route path={'/'} element={<AppLayout/>}>
                <Route index element={<Homepage/>}/>
                <Route path={'movies'}>
                    <Route index element={<MoviePage/>}/>
                    <Route path={':id'} element={<MovieDetailPage/>}/>
                </Route>
            </Route>

            {/* 404 Not Found Page */}
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
