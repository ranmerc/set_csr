import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import Styles from '../../styles/[nid].module.css';
import NewsletterForm from '../../components/NewsletterForm/NewsletterForm';

export default function NewsLetter() {
  const router = useRouter();
  const [nid, setNid] = useState('');
  const [content, setContent] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setNid(router.query.nid);
  }, [router]);

  useEffect(() => {
    if (error) {
      router.replace('/404');
    }
  }, [error, router]);

  useEffect(() => {
    let active = true;

    if (nid) {
      fetch(`/api/get/newsletters/?nid=${nid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode != 200) {
            setError(true);
          } else if (active) {
            setContent(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      active = false;
    };
  }, [nid]);

  return (
    <>
      <main className={Styles.container}>
        {content.length != 0 ? (
          <div className={Styles.newsletter}>
            <h1 className={Styles.title}>{content[0]}</h1>
            <p className={Styles.para}>{content[1]}</p>
          </div>
        ) : (
          <>
            <div className={Styles.loading}>
              <Loading />
            </div>
          </>
        )}

        <div className={Styles.newsletterForm}>
          <NewsletterForm />
        </div>
      </main>
    </>
  );
}
