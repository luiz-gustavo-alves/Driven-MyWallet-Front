import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Input, Button, StyledLink, Loader } from "../../components/FormComponents";
import { ThreeDots } from "react-loader-spinner";
import API from "../../services/api";

export default function Register() {

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submitForm = (e) => {
    e.preventDefault();
    setDisableForm(true)

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas digitadas não coincidem!");

    } else {

      API.signUp({...formData})
        .then(() => navigate("/"))
        .catch(err => {

          setDisableForm(false);

          if (err.response.status === 422) {
            alert("Campo(s) invalido(s) ou vazio(s).");

          } else if (err.response.status === 409) {
            alert("E-mail já cadastrado.");

          } else {
            alert(err.message);

            if (localStorage.getItem("auth")) {
              localStorage.removeItem("auth");
            }
            navigate("/");
          }
        });
    }
  }
    
  return (
    <Container>
      <StyledLink to="/">
        <h1>MyWallet</h1>
      </StyledLink>

      <Form onSubmit={submitForm} page="auth">
        <Input
          maxLength={50}
          data-test="name"
          placeholder="Nome"
          type="text"
          name="name"
          value={formData.name}
          onChange={updateForm}
        />

        <Input
          maxLength={254}
          data-test="email"
          placeholder="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={updateForm}
        />

        <Input
          maxLength={256}
          data-test="password"
          placeholder="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={updateForm}
        />

        <Input
          maxLength={256}
          data-test="conf-password"
          placeholder="Confirme a senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={updateForm}
        />

        <Button 
          type="submit" 
          data-test="sign-up-submit"
          title="Cadastrar"
          disabled={disableForm}>
          {disableForm ? "" : "Cadastrar"}
        </Button>
        <Loader page="auth">
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

      <StyledLink to="/">
        <h2>Já tem uma conta? Entre agora!</h2>
      </StyledLink>
    </Container>
  );
}