import { createGlobalStyle } from "styled-components";
import Post from "@components/Post";

export default function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Post />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("https://raw.githubusercontent.com/light9639/Netflix/main/img/netflix-background-black.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: darken;
    background-color: #222;
    color: #fff
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
