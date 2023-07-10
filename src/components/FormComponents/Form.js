import styled from "styled-components";

const Form = styled.form`

    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    gap: 15px;

    position: relative;

    ${(props) => {

        switch (props.page) {

            case ("auth"):
                return `
                    width: 80%;
                    align-items: center;
                `
            
            case ("option"):
                return `
                    width: 95%;
                `
        }
    }};
`;

export default Form;