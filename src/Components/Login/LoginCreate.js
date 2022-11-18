import React from 'react';
import Input from '../Forms/Input.js';
import Button from '../Forms/Button.js';
import Error from '../Helper/Error.js';
import useForm from '../../Hooks/useForm.js';
import { USER_POST } from '../../api.js';
import UserContext from '../../UserContext.js';
import useFetch from '../../Hooks/useFetch.js';
import Head from '../Helper/Head.js';

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm('email');

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      password: password.value,
      email: email.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }
  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          name="username"
          type="text"
          id="username"
          {...username}
        />
        <Input label="E-mail" name="email" type="mail" id="email" {...email} />
        <Input
          label="Senha"
          name="password"
          type="password"
          id="password"
          {...password}
        />
        {loading ? <Button>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
