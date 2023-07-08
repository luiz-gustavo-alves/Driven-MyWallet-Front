import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`

    padding: 35px 18px;
    margin: auto;
    max-width: 600px;
    min-width: 376px;
    user-select: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

    &:hover {
        opacity: 0.7;
    }
`;

const Footer = styled.div`

    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
`;

const Option = styled.div`

    width: 156px;
    height: 114px;
    border-radius: 8px;
    background-color: #A328D6;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
`;

const StyledLink = styled(Link)`

    p {
        font-size: 17px;
        line-height: 23px;
        font-weight: 500;
        width: 50%;
    }

    &:hover {
        opacity: 0.7;
    }

`; 

export {
    Container,
    UserContent,
    Title,
    Button,
    Footer,
    Option,
    StyledLink
}