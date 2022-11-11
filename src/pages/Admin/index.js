import './admin.css';

import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Logo from '../../components/Logo';
import Input from '../../components/Input';

import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { db } from '../../services/firebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

export default function Admin() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [background, setBackground] = useState("#F1F1F1");
  const [color, setColor] = useState("#121212");

  const [links, setLinks] = useState([]);

  useEffect(() => {

    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    onSnapshot(queryRef, (snapshot) => {
      let list = [];

      snapshot.forEach((item) => {
        list.push({
          id: item.id,
          name: item.data("name").name,
          url: item.data("url").url,
          bg: item.data("bg").bg,
          color: item.data("color").color
        })
      })

      setLinks(list);

    })

  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    if (name === "" && url === "") {
      toast.warn("Preencha todos os campos!")
      return;
    }
    // addDoc: gera um id aleatório

    addDoc(collection(db, "links"), {
      name: name,
      url: url,
      bg: background,
      color: color,
      created: new Date()
    })
    .then(() => {
      setName("")
      setUrl("")
      console.log("cadastrado com sucesso!")
    })
    .catch((e) => {
      console.log("erro ao registrar" + e)
      toast.error("Erro ao salvar seu link!")
    })


  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)


  }

  return (
    <div className="adminContainer">
      <Header />
      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <label htmlFor="name" className='label'>
          Nome

          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="url" className='label'>
          URL

          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <section className='containerColors'>
          <div>
            <label htmlFor="colorBack" className='label below'>
              Cor do link

              <input
                id="colorBack"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="colorFront" className='label below'>
              Cor de Fundo

              <input
                id="colorFront"
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </label>
          </div>

        </section>

        { name !== '' && (
          <div className='preview'>
            <label htmlFor="preview">
              Veja como está ficando 👇

              <article
                id="preview"
                className='list'
                style={{ marginTop: 8, backgroundColor: background }}
              >
                <p style={{ color: color }}>{name}</p>
              </article>
            </label>
          </div>
        )}

        <button className='btnRegister' type="submit">
          Cadastrar <MdAddLink size={24} color="#FFF" />
        </button>
      </form>

      <h2 className='title'>
        Meus links
      </h2>

      {links.map( (item, index) => (
        <article
          key={index}
          className='list animatePop'
          style={{ background: item.bg, color: item.color}}
          >
            <p>{item.name}</p>

            <div>
              <button className='btnDelete' onClick={ () => handleDeleteLink(item.id)}>
                <FiTrash2 size={18} color="#FFF"/>
              </button>
            </div>
      </article>
      ))}

    </div>
  );
}
