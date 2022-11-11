import './home.css';

import { useState, useEffect } from 'react';

import { Social } from '../../components/Social';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc
} from 'firebase/firestore';

import { db } from '../../services/firebaseConnection';

export default function Home() {

  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {

    function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then((snapshot) => {
        let list = [];

        snapshot.forEach((item) => {
          list.push({
            id: item.id,
            name: item.data().name,
            url: item.data().url,
            bg: item.data().bg,
            color: item.data().color
          })
        })

        setLinks(list)

      })

    }

    loadLinks();

  }, [])

  useEffect(() => {

    function loadSocialLinks() {
      const docRef = doc(db, "social", "link")

      getDoc(docRef)
      .then((snapshot) => {

        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            youtube: snapshot.data().youtube
          })
        }
      })

    }

    loadSocialLinks();

  }, [])

  return (
    <div className='homeContainer'>
      <h1>William Programador</h1>
      <span>Veja meus links 👇</span>

      <main className='links'>

        { links.map((item, index) => (
          <section
            className='linkArea'
            key={index}
            style={{ backgroundColor: item.bg }}
          >
            <a href={item.url} target="_blank" rel="noreferrer">
              <p className='linkText' style={{ color: item.color }}>
                {item.name}
                </p>
            </a>
          </section>
        ))}

      </main>

      {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
        <footer>
          <Social url={socialLinks?.facebook}>
            <FaFacebook size={35} color="#FFF" />
          </Social>

          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color="#FFF" />
          </Social>

          <Social url={socialLinks?.youtube}>
            <FaYoutube size={35} color="#FFF" />
          </Social>
      </footer>
      )}

    </div>
  );
}
