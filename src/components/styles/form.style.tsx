import styled from 'styled-components';

export const Label = styled.label`
  font-size: 12px;
  font-weight: normal;
  color: gray #777777;
  margin-bottom: 2px;
`;

interface InputProps {
  error?: boolean;
}

export const Input = styled.input<InputProps>`
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  padding: 13px;
  font-size: 12px;
  margin-bottom: 16px;
  margin-top: 4px;
  border-radius: 4px;
  transition: all linear 160ms;
  outline: none;
`;
export const Span = styled.span`
  font-size: 12px;
  font-weight: normal;
  color: black;
  margin-top: 8px;
  display: block;
  background-color: #ffebe9;
  border: solid 1px rgba(255, 129, 130, 0.4);
  border-radius: 6px;
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Usuario = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 7px;
  padding: 40px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.4);
  gap: 5px;
  transition: all ease 2s;

  h1 {
    color: #f72585;
    font: bold;
  }
`;
