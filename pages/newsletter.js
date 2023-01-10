import Head from 'next/head';
import { useState, useEffect } from 'react';
import NewsletterForm from '../components/NewsletterForm/NewsletterForm';
import Styles from '../styles/newsletter.module.css';
import Loading from '../components/Loading/Loading';
import Link from 'next/link';

export default function Newsletter() {
  const [newsletterList, setNewsletterList] = useState([]);

  useEffect(() => {
    let active = true;

    fetch(`/api/get/newsletterlist`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data.statusCode == 200) {
          setNewsletterList(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>H Society - Newsletter</title>
      </Head>
      <main className={Styles.container}>
        <div className={Styles.listContainer}>
          <div className={Styles.heading}>Available Newsletters</div>
          {newsletterList.length != 0 ? (
            <ul className={Styles.list}>
              {newsletterList.map((newsletter, i) => {
                return (
                  <Link key={i} href={`/newsletter/${i + 1}`}>
                    <li>
                      <a>{newsletter}</a>
                    </li>
                  </Link>
                );
              })}
            </ul>
          ) : (
            <>
              <Loading />
            </>
          )}
        </div>
        <div className={Styles.newsletterForm}>
          <NewsletterForm />
        </div>
      </main>
    </>
  );
}
