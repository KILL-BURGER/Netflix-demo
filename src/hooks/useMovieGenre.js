import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenre = () => {
    return api.get(`/genre/movie/list`);
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchMovieGenre,
        select: (result) => result.data.genres,
        staleTime: 300000, // 자주 변경이 안되기 때문에 5분에 한번 호출
    });
};