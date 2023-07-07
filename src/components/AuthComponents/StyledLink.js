import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-weight: 400;
        font-size: 32px;
        margin-bottom: 35px;
    }

    h2 {
        font-weight: 700;
        font-size: 15px;
        margin-top: 40px;

        &:hover {
            text-decoration: underline;
        }

        &:focus {
            opacity: 0.7;
        }
    }
`;

export default StyledLink;