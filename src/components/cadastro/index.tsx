import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Titulo } from '../styles/h1.style';
import { Button } from '../styles/button.style';
import { Div, Input, Label, Span } from '../styles/form.style';

function Cadastro() {
  const [mostraError, setMostraError] = useState(false);
  const [erros, setErros] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [valorSelecionado, setValorSelecionado] = useState('');

  const CADASTRO_MUTATION = gql`
    mutation Mutation($data: UserInput!) {
      createUser(data: $data) {
        id
        name
        phone
        birthDate
        email
        role
      }
    }
  `;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [Mutation, { error, loading }] = useMutation(CADASTRO_MUTATION, {
    onCompleted: () => {
      navigate('/home');
    },
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    function validacao(email: string, senha: string, telefone: string, DataNascimento: string, nomeCompleto: string): string[] {
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
      if (!telefone) {
        erros.push('O telefone é obrigatório.');
      } else if (!/^[0-9]+$/.test(telefone)) {
        erros.push('Telefone inválido.');
      }

      if (!dataNascimento) {
        erros.push('A data de nascimento é obrigatória.');
      } else {
        const hoje = new Date();
        const data = new Date(dataNascimento);
        let idade = hoje.getFullYear() - data.getFullYear();
        const mes = hoje.getMonth() - data.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < data.getDate())) {
          idade--;
        }
        if (idade < 15) {
          erros.push('É necessário ter pelo menos 15 anos para se cadastrar.');
        }
      }
      if (!nomeCompleto) {
        erros.push('O nome completo é obrigatório.');
      } else {
        const nomeSobrenome = nomeCompleto.split(' ');
        if (nomeSobrenome.length < 2) {
          erros.push('Preencha o nome completo.');
        }
      }

      if (!valorSelecionado) {
        erros.push('A sua função é obrigatória.');
      }
      return erros;
    }

    const erros = validacao(email, senha, telefone, dataNascimento, nomeCompleto);
    if (erros.length > 0) {
      setErros(erros);
      setMostraError(true);
    } else {
      Mutation({
        variables: {
          data: {
            birthDate: dataNascimento,
            email: email,
            name: nomeCompleto,
            password: senha,
            phone: telefone,
            role: valorSelecionado,
          },
        },
      });
      setMostraError(false);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'senha':
        setSenha(event.target.value);
        break;
      case 'telefone':
        setTelefone(event.target.value);
        break;
      case 'data':
        setDataNascimento(event.target.value);
        break;
      case 'nome':
        setNomeCompleto(event.target.value);
        break;
      case 'role':
        setValorSelecionado(event.target.value);
        break;
    }
  }

  function handleSelectChange(event: { target: { value: React.SetStateAction<string> } }) {
    setValorSelecionado(event.target.value);
  }

  return (
    <Div>
      <form className='form-cadastro' onSubmit={handleSubmit}>
        <Titulo>Criar usuário</Titulo>
        {mostraError ? (
          <Span>
            <div>
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
            <div>
              <p>{error?.graphQLErrors[0].message}</p>
            </div>
          </Span>
        ) : null}
        {loading ? (
          <div>
            <p>carregando...</p>
          </div>
        ) : null}
        <Label htmlFor='email'>E-mail:</Label>
        <Input
          error={mostraError}
          type='email'
          value={email}
          onChange={handleInputChange}
          name='email'
          placeholder='Digite seu e-mail'
        ></Input>
        <Label htmlFor='nome'>Nome:</Label>
        <Input
          error={mostraError}
          type='text'
          name='nome'
          value={nomeCompleto}
          onChange={handleInputChange}
          placeholder='Digite seu nome e sobrenome'
        ></Input>
        <Label htmlFor='telefone'>Telefone:</Label>
        <Input
          error={mostraError}
          type='text'
          name='telefone'
          value={telefone}
          onChange={handleInputChange}
          placeholder='(XX) XXXXX-XXXX'
        ></Input>
        <Label htmlFor='senha'>Senha:</Label>
        <Input
          error={mostraError}
          type='password'
          value={senha}
          onChange={handleInputChange}
          name='senha'
          placeholder='Digite sua senha'
        ></Input>
        <Label htmlFor='data'>Data de nascimento:</Label>
        <Input error={mostraError} type='date' name='data' value={dataNascimento} onChange={handleInputChange}></Input>
        <div className='container-botao'>
          <Label htmlFor='role'>Função:</Label>
          <select name='role' value={valorSelecionado} onChange={handleSelectChange}>
            <option value='' disabled selected>
              Selecione uma opção
            </option>
            <option value='admin'>Administrador</option>
            <option value='user'>Usuário</option>
          </select>
          <Button type='submit' value='Cadastrar' className='cadastro-btn' disabled={loading}></Button>
        </div>
      </form>
    </Div>
  );
}

export default Cadastro;
