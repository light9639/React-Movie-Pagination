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