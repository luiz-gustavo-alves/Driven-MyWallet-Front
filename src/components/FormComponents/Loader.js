import styled from "styled-components";

const Loader = styled.div`

    position: absolute;
    bottom: 0;
    left: ${props => props.page === "auth" ? "" : "40%"};
`;

export default Loader;