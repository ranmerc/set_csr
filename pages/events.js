import Head from 'next/head';
import { useEffect, useState } from 'react';
import EventCardList from '../components/EventCardList/EventCardList';
import Styles from '../styles/events.module.css';
import Loading from '../components/Loading/Loading';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let active = true;

    fetch('/api/get/events')
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setEvents(data.values);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>H Society - Events</title>
      </Head>
      <main className={Styles.container}>
        <section className={Styles.subContainer}>
          <h1 className={Styles.heading}>UPCOMING EVENTS</h1>
          {events.length != 0 ? (
            <EventCardList
              events={events
                .filter((event) => {
                  return event[6] === 'Upcoming';
                })
                .map(eventMap)}
            />
          ) : (
            <Loading />
          )}
        </section>
        <section className={Styles.subContainer}>
          <h1 className={Styles.heading}>PAST EVENTS</h1>
          {events.length != 0 ? (
            <EventCardList
              events={events
                .filter((event) => {
                  return event[6] === 'Past';
                })
                .map(eventMap)}
            />
          ) : (
            <Loading />
          )}
        </section>
      </main>
    </>
  );
}

const eventMap = (event) => {
  return {
    name: event[0] ?? '',
    date: event[1].replace(/\//g, '.'),
    time: event[2] ?? '',
    location: event[3] ?? '',
    prize: event[4] ?? '',
    poster: event[5] ? event[5] : '/404.jpg',
    status: event[6],
    reg_link: event?.[7] ? event?.[7] : '#',
    mode: event?.[8] ?? 'Online',
  };
};
