import './logo.css';

import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <h1 className='logo'>Dev<span className='logoText'>Link</span></h1>
    </Link>
  );
}
