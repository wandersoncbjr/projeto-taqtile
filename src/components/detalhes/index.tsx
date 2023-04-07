import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

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
  console.log(userId);

  const { data } = useQuery(GET_USERS, {
    variables: { _id: userId },
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
  });

  console.log(data);

  return (
    <div className='item-logado'>
      {data ? (
        <>
          <p>Nome: {data.user.name}</p>
          <p>Email: {data.user.email}</p>
          <p>ID: {data.user.id}</p>
          <p>Telefone: {data.user.phone}</p>
          <p>Data de nascimento: {data.user.birthDate}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Detalhes;
