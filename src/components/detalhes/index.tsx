import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Div, Usuario } from '../styles/form.style';

const GET_USERS = gql`
  query User($_id: ID!) {
    user(id: $_id) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;

function Detalhes() {
  const token = localStorage.getItem('token');
  const { userId } = useParams();

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: { _id: userId },
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
  });

  return (
    <Div>
      <Usuario>
        {data ? (
          <>
            <h1>INFORMAÇÃO DO USUÁRIO</h1>
            <h3>Nome: {data.user.name}</h3>
            <h3>Email: {data.user.email}</h3>
            <h3>ID: {data.user.id}</h3>
            <h3>Telefone: {data.user.phone}</h3>
            <h3>Data de nascimento: {data.user.birthDate}</h3>
          </>
        ) : null}
        {loading ? <p>carregando...</p> : null}
        {error ? <p>{error.message}</p> : null}
      </Usuario>
    </Div>
  );
}

export default Detalhes;
