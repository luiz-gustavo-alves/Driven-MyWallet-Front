import styled from "styled-components";

const Input = styled.input`

    width: 100%;
    height: 58px;
    border-radius: 5px;
    border: 1px solid #fff;
    padding: 15px;
    font-size: 20px;

    &::placeholder {
        color: #000;
    }

    &:focus {
        outline: 2px solid #000;
    }

    &:hover {
        outline: 2px solid #000;
    }
`;

export default Input;