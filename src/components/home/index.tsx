import { useNavigate } from 'react-router-dom';
import './index.css';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { ButtoCotainer, Button } from '../styles/button.style';

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
  const [limit, setLimit] = useState(12);
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
    setOffset(offset + 12);
  }

  function anterior() {
    setOffset(offset - 12);
  }

  return (
    <div>
      <div className='container-logado'>
        {data?.users?.nodes?.map((data: User) => (
          <div
            className='item-logado'
            onClick={() => {
              navigate(`user/${data.id}`);
            }}
          >
            <p>Nome: {data.name}</p>
            <p>Email: {data.email}</p>
          </div>
        ))}
        <p></p>

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
      <ButtoCotainer className='container-botao'>
        {data?.users?.pageInfo?.hasPreviousPage === true ? (
          <Button style={{ width: '15%', marginRight: '3rem' }} type='button' onClick={anterior} value='anterior'></Button>
        ) : null}
        {data ? (
          <div>
            Página {Math.floor(offset / limit) + 1} de {paginas}
          </div>
        ) : null}
        {data?.users?.pageInfo?.hasNextPage === true ? (
          <Button style={{ width: '15%', marginLeft: '3rem' }} type='button' onClick={proximo} value='proximo'></Button>
        ) : null}
      </ButtoCotainer>
    </div>
  );
}
export default Logado;
