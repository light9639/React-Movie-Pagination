import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

export default function Posts() {
    const [posts, setPosts] = useState<any>([]);
    const [limit, setLimit] = useState<number>(9);
    const [page, setPage] = useState<number>(1);
    const offset = (page - 1) * limit;

    const key = "14c8cd43e94f788fd795b70ca3650c98";
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}`;

    useEffect(() => {
        fetch("https://yts.mx/api/v2/list_movies.json?sort=seeds&minimum_rating=8&page=1&limit=50")
            .then((res) => res.json())
            .then((data) => setPosts(data.data.movies));
    }, []);

    return (
        <Layout>
            <header>
                <h1>영화 목록</h1>
            </header>

            <label>
                페이지 당 표시할 게시물 수 :
                <select
                    value={limit}
                    onChange={({ target: { value } }) => setLimit(Number(value))}
                >
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </label>

            <Main>
                {posts.slice(offset, offset + limit).map((item: any, idx: number) => (
                    <Article key={item.id}>
                        <Img src={item.medium_cover_image} alt={item.title} />
                        <div>
                            <h3>
                                {item.title},
                            </h3>
                            <p>방영연도 : {item.year}</p>
                            <p>Rating(평점) : {item.rating}</p>
                            <p>Genres: {item.genres}</p>
                        </div>

                    </Article>
                ))}
            </Main>

            <footer>
                <Pagination
                    total={posts.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </footer>
        </Layout>
    );
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
`;

const Main = styled.article`
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 15px;
`

const Article = styled.article`
    max-width: calc(900px / 3.3);
    margin: 10px;
    width: 100%;

    @media screen and (max-width: 900px) {
        margin: 10px auto;
    }

    div {
        padding: 0.25rem;
    }

    h3 {
        font-size: 1rem;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    p {
        font-size: 0.65rem;
        line-height: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`

const Img = styled.img`
    width: 150px;
    margin-top: 10px;
`