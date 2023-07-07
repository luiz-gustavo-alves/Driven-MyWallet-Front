import { Container, Form, Input, Button } from "../../components/AuthComponents";

export default function Login() {
    
  return (
    <Container>
      <a href="/">
        <h1>MyWallet</h1>
      </a>
      <Form>
        <Input
          placeholder="E-mail"
        />
        <Input
          placeholder="Senha"
        />
        <Button>{"Entrar"}</Button>
      </Form>
      <a href="/cadastro">
        <h2>Primeira vez? Cadastre-se!</h2>
      </a>
    </Container>
  );
}