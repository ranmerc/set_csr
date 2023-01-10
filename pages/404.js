import Styles from '../styles/404.module.css';

export default function NotFound() {
  return (
    <>
      <main className={Styles.main}>
        <div className={Styles.error}>Page Not Found!</div>
      </main>
    </>
  );
}
