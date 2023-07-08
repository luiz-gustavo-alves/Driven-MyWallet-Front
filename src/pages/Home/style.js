import styled from "styled-components";

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 35px 18px;
    max-width: 600px;
    margin: 0 auto;
    user-select: none;
`;

const UserContent = styled.div`

    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 25px;
`;

const Title = styled.h1`

    font-size: 26px;
    font-weight: 700;
    color: #fff;
`;

const Button = styled.button`

    width: 26px;
    height: 26px;
    background: inherit;
    border: none;
    cursor: pointer;
`;

export {
    Container,
    UserContent,
    Title,
    Button
}