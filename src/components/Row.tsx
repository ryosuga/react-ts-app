import { useEffect, useState } from "react";
import "./Row.scss";
import axios from "../axios";

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
    title: string;
    fetchUrl: string;
    isLargeRow?: boolean;
};

type Movie = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    //urlが更新される度に
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className="Row">
            <h2>{title}</h2>
            <div className="Row-posters">
                {movies.map((movie, i) => (
                    <img
                        key={movie.id}
                        className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name}

                    />
                ))}
            </div>
        </div>
    );
};

// メモ:
// ・映画データはstateで管理
// ・useStateで[]空配列を初期化して、データ取得次第更新していく
// ・映画のAPIデータは『非同期処理』で取り扱う(普通の同期通信では上から順番に処理がされてしまう。ページ自体の表示が遅くなってしまう。)