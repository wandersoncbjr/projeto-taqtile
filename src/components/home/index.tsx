import { useNavigate } from 'react-router-dom';
import './index.css';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';

const GET_USERS = gql`
  query Users($offset: Int, $limit: Int) {
    users(data: { offset: $offset, limit: $limit }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        name
        phone
        email
        birthDate
      }
      count
    }
  }
`;
interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
}

function Logado() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15);
  const { data } = useQuery(GET_USERS, {
    variables: { offset: offset, limit: limit },
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
  });
  const paginas = Math.ceil(data?.users?.count / limit);

  if (!token) {
    navigate('/login');
  }

  function proximo() {
    setOffset(offset + 15);
  }

  function anterior() {
    setOffset(offset - 15);
  }

  return (
    <div className='container-logado'>
      {data?.users?.nodes?.map((data: User) => (
        <div className='item-logado'>
          <p>Nome: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>ID: {data.id}</p>
          <p>Telefone: {data.phone}</p>
          <p>data de nascimento: {data.birthDate}</p>
        </div>
      ))}
      <p>
        Página {Math.floor(offset / limit) + 1} de {paginas}
      </p>
      {data?.users?.pageInfo?.hasPreviousPage === true ? <button onClick={anterior}>anterior</button> : null}
      {data?.users?.pageInfo?.hasNextPage === true ? <button onClick={proximo}>proximo</button> : null}
      <div className='botao-container'>
        <button
          className='botao'
          onClick={() => {
            navigate('/cadastro');
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default Logado;
