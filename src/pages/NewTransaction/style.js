import styled from "styled-components";

const Container = styled.div`

    display: flex;
    flex-direction: column;
    padding: 35px 18px;
    gap: 15px;
    width: 95%;
    max-width: 600px;
    min-width: 376px;
    margin: 0 auto;
`;

const Title = styled.h1`

    font-size: 26px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 15px;
`;

export {
    Container,
    Title
}