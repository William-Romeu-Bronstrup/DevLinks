import './login.css';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Logo from '../../components/Logo';
import Input from '../../components/Input';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {

    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha os campos!")
      return false;
    }

    signInWithEmailAndPassword(auth, email, password)
     .then(() => {

      toast.success("Bem vindo de volta")
      setEmail("")
      setPassword("")
      navigate("/admin", { replace: true });

     })
     .catch(() => {
      toast.error("Erro ao tentar fazer o login!");
     })

  }

  return (
    <div className='loginContainer' onSubmit={handleLogin}>
      <Logo />

      <form className="form">

        <label htmlFor="email">
          Email:

          <Input
            id="email"
            type="email"

            value={email}
            onChange={(e) => setEmail(e.target.value)}

            placeholder="Digite seu email..."
            autoComplete='on'
          />
        </label>

        <label htmlFor="password">
          Senha:

          <Input
            id="password"
            type="password"
            minLength={6}

            value={password}
            onChange={(e) => setPassword(e.target.value)}

            placeholder="********"
            autoComplete='on'
          />
        </label>

        <button type="submit">
          Acessar
        </button>

      </form>
    </div>
  );
}
