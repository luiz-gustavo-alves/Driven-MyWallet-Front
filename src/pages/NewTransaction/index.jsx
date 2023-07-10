import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Loader } from "../../components/FormComponents";
import { Container, Title } from "../../components/TransactionOpComponents";
import { formatValueFloat } from "../../utils";
import { ThreeDots } from "react-loader-spinner";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function NewTransaction() {

  const [formData, setFormData] = useState({ value: "", description: "" });
  const [disableForm, setDisableForm] = useState(null);
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submitForm = (e) => {

    e.preventDefault();
    setDisableForm(true);

    const formatedValue = formatValueFloat(formData.value);
    if (Number(formatedValue)) {
      formData.value = formatedValue;
    }

    API.newTransaction({...formData}, params.tipo, auth.token)
      .then(() => navigate("/home"))
      .catch(err => {

        setDisableForm(false);

        if (err.response.status === 422) {
          alert("Campo(s) invalido(s) ou vazio(s).")

        } else {
          alert(err.message);
          localStorage.removeItem("auth");
          navigate("/");
        }
      });
  }

  useEffect(() => {
    
    if ((!auth.token) || (params.tipo !== "entrada" && params.tipo !== "saida")) {
      navigate("/");
    }

  }, []);

  return (
    <Container>
      <Title>
        {`Nova ${params.tipo}`}
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
          title={`Salvar ${params.tipo}`}>
          {disableForm ? "" : `Salvar ${params.tipo}`}
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