import { useState } from "react";
import { Container, Form, Input, Button, StyledLink } from "../../components/AuthComponents";

import API from "../../services/api";

export default function Register() {

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submitForm = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas digitadas não coincidem!");

    } else {

      const sendData = formData;
      delete sendData.confirmPassword

      API.signUp({...sendData})
        .then(res => console.log(res))
        .catch(err => {

          if (err.response.status === 422) {
            alert("Campo invalido ou vazio.");

          } else if (err.response.status === 409) {
            alert("E-mail já cadastrado.");

          } else {
            alert(err.message);
          }
        });
    }
  }
    
  return (
    <Container>
      <StyledLink to="/">
        <h1>MyWallet</h1>
      </StyledLink>

      <Form onSubmit={submitForm}>
        <Input
          placeholder="Nome"
          name="name"
          value={formData.name}
          onChange={updateForm}
        />

        <Input
          placeholder="E-mail"
          name="email"
          value={formData.email}
          onChange={updateForm}
        />

        <Input
          placeholder="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={updateForm}
        />

        <Input
          placeholder="Confirme a senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={updateForm}
        />

        <Button type="submit">
          {"Cadastrar"}
          </Button>
      </Form>

      <StyledLink to="/">
        <h2>Já tem uma conta? Entre agora!</h2>
      </StyledLink>
    </Container>
  );
}