import React, { useState, useEffect, useCallback } from "react";
import "./Nav.scss";

type Props = {
    className?: string;
};

export const Nav = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const handleShow = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleShow);
        return () => {
            window.removeEventListener("scroll", handleShow);
        };
    }, []);

    // DOM
    return (
        <div className={`Nav ${show && "Nav-black"}`}>
            <img
                className="Nav-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img
                className="Nav-avater"
                src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
                alt="Avatar"
            />
        </div>
    );
};

// メモ:
// ・映画データはstateで管理
// ・useStateで[]空配列を初期化して、データ取得次第更新していく
// ・映画のAPIデータは『非同期処理』で取り扱う(普通の同期通信では上から順番に処理がされてしまう。ページ自体の表示が遅くなってしまう。)
