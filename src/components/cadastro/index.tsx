import React, { useState } from 'react';
import './index.css';

function Cadastro() {
  const [mostraError, setMostraError] = useState(false);
  const [erros, setErros] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');

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
      } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(telefone)) {
        erros.push('Telefone inválido. O formato deve ser (XX) XXXXX-XXXX.');
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
      return erros;
    }

    const erros = validacao(email, senha, telefone, dataNascimento, nomeCompleto);
    if (erros.length > 0) {
      setErros(erros);
      setMostraError(true);
    } else {
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
      default:
    }
  }

  return (
    <div className='container-cadastro'>
      <form className='form-cadastro' onSubmit={handleSubmit}>
        {mostraError ? (
          <div className='error-cadastro'>
            <ul>
              {erros.map((erro) => (
                <li>{erro}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <label htmlFor='email'>E-mail:</label>
        <input type='email' value={email} onChange={handleInputChange} name='email' placeholder='Digite seu e-mail' />
        <label htmlFor='nome'>Nome:</label>
        <input type='text' name='nome' value={nomeCompleto} onChange={handleInputChange} placeholder='Digite seu nome e sobrenome' />
        <label htmlFor='telefone'>Telefone:</label>
        <input type='text' name='telefone' value={telefone} onChange={handleInputChange} placeholder='(XX) XXXXX-XXXX' />
        <label htmlFor='senha'>Senha:</label>
        <input type='password' value={senha} onChange={handleInputChange} name='senha' placeholder='Digite sua senha' />
        <label htmlFor='data'>Data de nascimento:</label>
        <input type='date' name='data' value={dataNascimento} onChange={handleInputChange} />
        <div className='container-botao'>
          <label htmlFor='role'>Função:</label>
          <select name='role'>
            <option value='admin'>Administrador</option>
            <option value='user'>Usuário</option>
          </select>
          <input type='submit' value='Cadastrar' className='cadastro-btn' />
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
