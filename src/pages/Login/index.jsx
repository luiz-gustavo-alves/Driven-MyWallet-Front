import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Form, Input, Button, StyledLink, Loader } from "../../components/FormComponents";
import { ThreeDots } from "react-loader-spinner";

import API from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function Login() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [disableForm, setDisableForm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const updateForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setDisableForm(true);

    API.signIn({...formData})
      .then(res => {

        login(res.data);
        navigate("/home");
      })
      .catch(err => {

        setDisableForm(false);

        if (err.response.status === 422) {
          alert("Campo(s) invalido(s) ou vazio(s).");

        } else if (err.response.status === 401 || err.response.status === 404) {
          alert("E-mail ou senha incorretos.");

        } else {
          alert(err.message);

          if (localStorage.getItem("auth")) {
            localStorage.removeItem("auth");
          }
          navigate("/");
        }

      });
  }

  return (
    <Container>
      <StyledLink to="/">
        <h1>MyWallet</h1>
      </StyledLink>

      <Form onSubmit={submitForm} page="auth">
        <Input
          maxLength={254}
          data-test="email"
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={updateForm}
        />

        <Input
          maxLength={256}
          data-test="password"
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={updateForm}
        />

        <Button 
          type="submit" 
          data-test="sign-in-submit"
          title="Login"
          disabled={disableForm}>
          {disableForm ? "" : "Entrar"}
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

      <StyledLink to="/cadastro">
        <h2>Primeira vez? Cadastre-se!</h2>
      </StyledLink>
    </Container>
  );
}