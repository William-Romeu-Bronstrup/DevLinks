import './error.css';

import Logo from '../../components/Logo';

import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='error'>
      <Logo />
      <h1>Página não encontrada!</h1>
      <p>Esta página não existe | Verifique seu link</p>

      <Link to="/" className='link'>
        Voltar para home
      </Link>
    </div>
  );
}
