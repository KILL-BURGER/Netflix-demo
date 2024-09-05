import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

let history = [];

const fetchSearchMovie = ({keyword, page}) => {
    // console.log('history', history);
    if (keyword && history[history.length - 1] === keyword) {
        // console.log('키워드 같음');
        return api.get(`/search/movie?query=${keyword}&page=${page}`);
    } else if (keyword && history[history.length - 1] !== keyword) {
        // console.log('키워드 다름');
        history.push(keyword);
        return api.get(`/search/movie?query=${keyword}&page=${1}`);
    } else {
        return api.get(`/movie/popular?page=${page}`);
    }
};

export const useSearchMovieQuery = ({keyword, page}) => {
    return useQuery({
        queryKey: ['movie-search', {keyword, page}],
        queryFn: () => fetchSearchMovie({keyword, page}),
        select: (result) => result.data,
    });
};