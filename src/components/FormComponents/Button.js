import styled from "styled-components";

const Button = styled.button`

    width: 100%;
    height: 46px;
    border: none;
    border-radius: 5px;
    background-color: #A328D6;

    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};

    &:hover {
        opacity: 0.7;
    }
`;

export default Button;