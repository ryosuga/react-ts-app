import { request } from "https";
import React, { useEffect, useState } from "react";
import { DEFAULT_MIN_VERSION } from "tls";
import axios from "../axios";
import { requests } from "../request";
import "./Banner.scss";


type movieProps = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
};

export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>({});
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.feachNetflixOriginals);
            console.log(request.data.result);

            // APIからランダムで値を取得
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);
    console.log(movie);

    // descriptionの切り捨て用の関数
    function truncate(str: any, n: number) {
        // undefindを弾く
        if (str !== undefined) {
            return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        }
    }

    // DOM
    return (
        <header className="Banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
        >
            <div className="Banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="Banner-buttons">
                    <button className="Banner-button">Play</button>
                    <button className="Banner-button">My List</button>
                </div>

                <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="Banner-fadeBottom" />
        </header>
    );
};

// メモ:
// ・映画データはstateで管理
// ・useStateで[]空配列を初期化して、データ取得次第更新していく
// ・映画のAPIデータは『非同期処理』で取り扱う(普通の同期通信では上から順番に処理がされてしまう。ページ自体の表示が遅くなってしまう。)