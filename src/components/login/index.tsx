import './index.css';
import { useState } from 'react';
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../styles/h1.style';
import { Button } from '../styles/button.style';
import { Div, Input, Span } from '../styles/form.style';

const LOGIN_MUTATION = gql`
  mutation login($login: LoginInput!) {
    login(data: $login) {
      token
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const key = 'token';
      localStorage.setItem(key, `${data.login.token}`);
      navigate('/');
    },
  });

  const [mostraError, setMostraError] = useState(false);
  const [erros, setErros] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    function validacao(email: string, senha: string): string[] {
      const erros: string[] = [];

      if (!email) {
        erros.push('O e-mail é obrigatório.');
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        erros.push('E-mail inválido.');
      }

      if (!senha) {
        erros.push('A senha é obrigatória.');
      } else if (senha.length < 7) {
        erros.push('A senha deve ter pelo menos 7 caracteres.');
      } else if (!/[a-zA-Z]/.test(senha) || !/\d/.test(senha)) {
        erros.push('A senha deve ter pelo menos uma letra e um dígito.');
      }

      return erros;
    }
    const erros = validacao(email, senha);
    if (erros.length > 0) {
      setErros(erros);
      setMostraError(true);
    } else {
      login({
        variables: {
          login: {
            email: email,
            password: senha,
          },
        },
      });

      setMostraError(false);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'senha') {
      setSenha(event.target.value);
    }
  }

  return (
    <Div>
      <form onSubmit={handleSubmit} className='form-login'>
        <header>
          <Titulo>Bem vindo(a) à Taqtile!</Titulo>
        </header>
        {mostraError ? (
          <Span>
            <div className='error-login'>
              <ul>
                {erros.map((erro) => (
                  <li>{erro}</li>
                ))}
              </ul>
            </div>
          </Span>
        ) : null}
        {error ? (
          <Span>
            <div className='error-login'>
              <p>{error.message}</p>
            </div>
          </Span>
        ) : null}
        {loading ? (
          <div>
            <p>carregando...</p>
          </div>
        ) : null}
        <label htmlFor='email'>E-mail</label>
        <Input
          type='email'
          error={mostraError}
          value={email}
          onChange={handleInputChange}
          name='email'
          placeholder='Digite seu e-mail'
        ></Input>
        <label htmlFor='senha'>Senha</label>
        <Input
          type='password'
          error={mostraError}
          value={senha}
          onChange={handleInputChange}
          name='senha'
          placeholder='Digite sua senha'
        ></Input>
        <Button type='submit' value='Acessar' className='btn-login' disabled={loading}></Button>
      </form>
    </Div>
  );
}

export default Login;
