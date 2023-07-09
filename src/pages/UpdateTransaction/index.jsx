import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "../../components/FormComponents";
import { Container, Title } from "../../components/TransactionOpComponents";
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

    const updateForm = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitForm = (e) => {
      e.preventDefault();

      formData.value = formatValueFloat(formData.value);

      API.updateTransaction({...formData}, params.tipo, params.id, auth.token)
        .then(() => {
          setTransactionOp({ operation: "update" });
          navigate("/home");
        })
        .catch((err) => {

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
      return <h1>Carregando...</h1>
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
            data-test="registry-name-input"
            placeholder="Descrição"
            name="description"
            value={formData.description}
            onChange={updateForm}
          />
  
          <Button type="submit" data-test="registry-save">
            {`Atualizar ${params.tipo}`}
          </Button>
        </Form>
      </Container>
    );
}