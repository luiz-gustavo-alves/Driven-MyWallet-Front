import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "../../components/FormComponents";
import { Container, Title } from "./style";
import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function NewTransaction() {

  const [formData, setFormData] = useState({ value: "", description: "" });
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submitForm = (e) => {

    e.preventDefault();

    if (formData.value.includes(",")) {
      formData.value = formData.value.replace(",", ".");
    }

    formData.value = Number(formData.value).toFixed(2);
    formData.value = Number(formData.value);

    API.newTransaction({...formData}, params.tipo, auth.token)
      .then(() => navigate("/home"))
      .catch(err => {

        if (err.response.status === 422) {
          alert("Campo(s) invalido(s) ou vazio(s).")

        } else {
          alert(err.message);
        }
      });
  }

  useEffect(() => {
    
    if ((!auth.token) || (params.tipo !== "entrada" && params.tipo !== "saida")) {
      navigate("/");
    }

  }, [])

  return (
    <Container>
      <Title>
        {`Nova ${params.tipo}`}
      </Title>

      <Form onSubmit={submitForm} page="option">
        <Input
          placeholder="Valor"
          name="value"
          value={formData.value}
          onChange={updateForm}
        />

        <Input 
          placeholder="Descrição"
          name="description"
          value={formData.description}
          onChange={updateForm}
        />

        <Button type="submit">
          {`Salvar ${params.tipo}`}
        </Button>
      </Form>
    </Container>
  )
}