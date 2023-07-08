import styled from "styled-components";

const Container = styled.div`

    width: 100%;
    height: 446px;
    border-radius: 8px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Content = styled.ul`

    display: flex;
    flex-direction: column;
`;

const Transaction = styled.li`

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

const LeftContent = styled.div`

    display: flex;
    align-items: center;
    width: 80%;
`;

const Date = styled.p`

    color: #C6C6C6;
    margin-right: 10px;
`;

const Title = styled.p`

    font-weight: 500;
    color: #000;
    word-break: break-word;
`;

const Value = styled.p`

    font-weight: 500;
    color: ${(props) => {
       
        if (props.type) {
            return props.type === "entrada" ? "#03AC00" : "#C70000";
        }
        
        if (props.total) {
            return props.total >= 0 ? "#03AC00" : "#C70000";
        } 
    }};
`;

const Footer = styled.div`

    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    font-weight: 700;
    font-size: 17px;
    color: #000;
`;

const Default = styled.div`

    width: 80%;
    margin: auto;
    text-align: center;
    font-size: 20px;
    line-height: 27px;
    color: #868686;
`;

export {
    Container,
    Content,
    Transaction,
    LeftContent,
    Date,
    Title,
    Value,
    Footer,
    Default
}