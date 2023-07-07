import { Container, Form, Input, Button } from "../../components/AuthComponents";

export default function Register() {
    
  return (
    <Container>
      <a href="/">
        <h1>MyWallet</h1>
      </a>
      <Form>
        <Input
            placeholder="Nome"
        />
        <Input
          placeholder="E-mail"
        />
        <Input
          placeholder="Senha"
        />
        <Input
          placeholder="Confirme a senha"
        />
        <Button>{"Cadastrar"}</Button>
      </Form>
      <a href="/">
        <h2>Já tem uma conta? Entre agora!</h2>
      </a>
    </Container>
  );
}