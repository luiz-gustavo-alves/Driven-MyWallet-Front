import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Form, Input, Button, StyledLink } from "../../components/AuthComponents";

import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function Login() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();

    API.signIn({...formData})
      .then(res => {

        login(res.data);
        navigate("/home");
      })
      .catch(err => {

        if (err.response.status === 422) {
          alert("Campo invalido ou vazio.");

        } else if (err.response.status === 401 || err.response.status === 404) {
          alert("E-mail ou senha incorretos.");

        } else {
          alert(err.message);
        }
      });
  }

  return (
    <Container>
      <StyledLink to="/">
        <h1>MyWallet</h1>
      </StyledLink>

      <Form onSubmit={submitForm}>
        <Input
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={updateForm}
        />

        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={updateForm}
        />

        <Button type="submit">
          {"Entrar"}
        </Button>
      </Form>

      <StyledLink to="/cadastro">
        <h2>Primeira vez? Cadastre-se!</h2>
      </StyledLink>
    </Container>
  );
}