import { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

export default function Posts() {
    const [posts, setPosts] = useState<any>([]);
    const [limit, setLimit] = useState<number>(9);
    const [page, setPage] = useState<number>(1);
    const offset = (page - 1) * limit;

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
                        <h3>{item.title}</h3>
                        <Img src={item.medium_cover_image} alt={item.title} />
                        <TextBox>
                            <p>방영연도 : {item.year}</p>
                            <p>Rating(평점) : {item.rating}</p>
                        </TextBox>

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
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
`;

const Main = styled.article`
    display: flex;
    justify-content: flex-start;
    margin: 0 auto;
    flex-wrap: wrap;
    text-align: center;
    padding: 20px;
`

const Article = styled.article`
    max-width: calc(920px / 3);
    margin: 20px;
    width: 100%;
    background-color: #f8fafc;
    color: #333;
    border-radius: 10px;
    padding: 10px 20px 20px 20px;

    @media screen and (max-width: 1200px) {
        margin: 10px auto;
    }

    h3 {
        font-size: 1.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`

const Img = styled.img`
    width: 70%;
    border-radius: 10px;
`

const TextBox = styled.div`
    margin-top: 20px;

    p {
        font-size: 0.9rem;
        letter-spacing: -0.5;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`
