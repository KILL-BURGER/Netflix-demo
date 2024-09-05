import {useQuery} from "@tanstack/react-query";
import api from "../utils/api";

const fetchRelatedMovies = (id) => {
    return api.get(`/movie/${id}/recommendations`);
}

export const useRelatedMoviesQuery = ({id}) => {
    return useQuery({
        queryKey:['movie-related'],
        queryFn: () => fetchRelatedMovies(id),
        select: (result) => result.data,
    });
}