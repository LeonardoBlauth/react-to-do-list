import imgLogo from '../assets/rocket.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={imgLogo} alt="Logotipo To Do List" />
      <h1>todo</h1>
    </header>
  )
}