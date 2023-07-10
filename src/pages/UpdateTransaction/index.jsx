import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Loader } from "../../components/FormComponents";
import { Container, Title } from "../../components/TransactionOpComponents";
import { CenterLoader } from "./style";
import { Oval, ThreeDots } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import useTransactionOp from "../../hooks/useTransactionOp";
import API from "../../services/api";
import { formatValueFloat } from "../../utils";

export default function UpdateTransaction() {

    const { auth } = useAuth();
    const { setTransactionOp } = useTransactionOp();
    const params = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [disableForm, setDisableForm] = useState(null);

    const updateForm = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = (e) => {
      e.preventDefault();
      setDisableForm(true);

      const formatedValue = formatValueFloat(formData.value);
      if (Number(formatedValue)) {
        formData.value = formatedValue;
      }

      API.updateTransaction({...formData}, params.tipo, params.id, auth.token)
        .then(() => {
          setTransactionOp({ operation: "update" });
          navigate("/home");
        })
        .catch((err) => {

          setDisableForm(false);

          if (err.response.status === 422) {
            alert("Campo(s) invalido(s) ou vazio(s).")

          } else {
            alert(err.message);
            localStorage.removeItem("auth");
            navigate("/");
          }
        })
    };

    useEffect(() => {
    
      if ((!auth.token) || (params.tipo !== "entrada" && params.tipo !== "saida")) {
        navigate("/");

      } else {
        
        API.getTransactionByIndex(params.tipo, params.id, auth.token)
          .then((res) => {
            const { value, description } = res.data;
            setFormData({ value: value, description: description });
          })
          .catch(() => {
            localStorage.removeItem("auth");
            navigate("/");
          });
      }
    
    }, []);

    if (formData === null) {
      return (
        <CenterLoader>
          <Oval
            height="200"
            width="200"
            color="#fff"
            ariaLabel='oval-loading'
            secondaryColor="#fff"
            strokeWidth={2}
            strokeWidthSecondary={2}
            visible={true}
          />
        </CenterLoader>
      );
    }

    return (
      <Container>
        <Title>
          {`Editar ${params.tipo}`}
        </Title>
  
        <Form onSubmit={submitForm} page="option">
          <Input
            data-test="registry-amount-input"
            placeholder="Valor"
            name="value"
            value={formData.value}
            onChange={updateForm}
          />
  
          <Input
            maxLength={100}
            data-test="registry-name-input"
            placeholder="Descrição"
            name="description"
            value={formData.description}
            onChange={updateForm}
          />
  
          <Button 
            type="submit"
            data-test="registry-save"
            disabled={disableForm}
            title={`Atualizar ${params.tipo}`}>
            {disableForm ? "" : `Atualizar ${params.tipo}`}
          </Button>
          <Loader page="option">
            <ThreeDots
              height="45"
              width="80"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              visible={disableForm}
            />
          </Loader>
        </Form>
      </Container>
    );
}