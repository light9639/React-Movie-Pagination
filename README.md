# 🎥 yts 사이트의 api를 이용하여 만든 React Pagination 예제.

:octocat: 바로 가기 : https://light9639.github.io/React-Movie-Pagination/

![localhost_3000_](https://user-images.githubusercontent.com/95972251/220348777-78a59b1c-5f39-489a-85e6-2a052b438daa.png)

:sparkles: 🎥 yts 사이트의 api를 이용하여 만든 React Pagination 예제. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## 💄 styled-components 라이브러리 설치
- `styled-components`를 이용하여 스타일링 페이지네이션을 구현할 것이기 때문에, 라이브러리를 설치한다. 
```bash
$ npm install styled-components
# or
$ yarn add styled-components
```
## ✒️ index.html, App.tsx 수정 및 작성
### ⚡ index.html
- `<head></head>` 안에 밑의 코드를 추가한다.
```html
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css" />
```
### ⚡ App.tsx
- `createGlobalStyle`를 `import` 하여 전역으로 스타일을 적용할 수 있도록 설정한다.
- 폰트는 `Apple SD Gothic Neo`를 사용했으며 `index.html`에 `link`를 넣음으로써 적용된다.
```typescript
import { createGlobalStyle } from "styled-components";
import Post from "@components/Post";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <GlobalStyle />
      <Post />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("https://raw.githubusercontent.com/light9639/Netflix/main/img/netflix-background-black.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: darken;
    background-color: #222;
    color: #fff;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  a,p,span,b,h1,h2,h3,h4,h5,h6 {
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard Variable", Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  select {
    appearance: none;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: #444;
    background-color: #fff;
    padding: 0.5rem 1rem;
    margin-left: 5px;
    border: 1px solid #aaa;
    border-radius: 5px;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  }

  select:hover {
    border-color: #888;
  }

  select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  select:disabled {
    opacity: 0.5;
  }

  nav svg {
    margin-top: 3px;
    justify-content: space-around;
  }
`;
```
## 📝 components 파일 속 Post.tsx, Pagination.tsx 수정 및 작성
### ⚡ Post.tsx
- `fetch` 함수를 사용하여 <a href="https://yts.mx">yts 사이트</a>에서 발급받은 키를 이용하여 영화 데이터를 가져온다.
- 가져온 데이터를 `posts`에 넣은 다음 `slice` 함수를 사용하여 페이지 당 표시할 게시물 숫자를 입력하면 그 숫자만큼만 가져오도록 작성한다.
```typescript
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
```
### ⚡ Pagination.tsx
- 왼쪽 `Button`을 클릭하면 `pageNumber`가 1씩 감소하며, 오른쪽 `Button`을 클릭하면 `pageNumber`가 1씩 증가하게 설정한다.
- Post.tsx에서 전달받은 `props`를 전달받은 다음 `numPages`는 `총 영화 개수/limit`로 나누면 그 숫자만큼의 페이지 숫자만 남게 된다.
```typescript
import React, { useState } from "react";
import styled from "styled-components";

const Pagination: React.FC<any> = ({ total, limit, page, setPage }) => {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <Nav>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </Button>
                {Array(numPages)
                    .fill({})
                    .map((_item, idx) => (
                        <Button
                            key={idx + 1}
                            onClick={() => setPage(idx + 1)}
                            aria-current={page === idx + 1 ? "page" : null}
                        >
                            {idx + 1}
                        </Button>
                    ))}
                <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    <svg fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </Button>
            </Nav>
        </>
    );
}

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`;

const Button = styled.button`
    border: none;
    border-radius: 50%;
    max-width: 30px;
    max-height: 30px;
    width: 100vw;
    height: 100vh;
    margin: 2px;
    background: #fff;
    color: #000;
    font-weight: 600;
    font-size: 1rem;
    transition: .5s;

    &:hover {
        background: #ef4444;
        color: #fff;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        /* background: #fff;
        color: #fff; */
        cursor: no-drop;
        transform: revert;
        &:hover {
            background: #fff;
            color: #000;
        }
    }

    &[aria-current] {
        background: #dc2626;
        color: #fff;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

export default Pagination;
```
