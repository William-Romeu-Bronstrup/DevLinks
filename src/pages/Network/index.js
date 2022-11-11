import './network.css';

import { useState, useEffect } from 'react';

import { db } from '../../services/firebaseConnection';
import {
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';

import Header from '../../components/Header';
import Input from '../../components/Input';
import { MdAddLink } from 'react-icons/md';

import { toast } from 'react-toastify';

export default function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {

    async function loadSocialLinks() {
      const docRef = doc(db, "social", "link")
      const get = await getDoc(docRef)

      if (get !== undefined) {
        setFacebook(get.data().facebook)
        setInstagram(get.data().instagram)
        setYoutube(get.data().youtube)
      }

    }

    loadSocialLinks();

  }, [])

  function handleSave(e) {
    e.preventDefault();

    //setDoc cria um novo documento

    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
    .then(() => {
      toast.success("Links salvos com Sucesso!")
    })
    .catch(() => {
      toast.error("Erro ao salvar os links")
    })
  }

  return (
    <div className='adminContainer'>
      <Header />

      <h1 className='titleSocial'>Sua redes sociais</h1>

      <form className='form' onSubmit={handleSave}>

        <label htmlFor="inputSocial">
          Link do Facebook

          <Input
            id="inputSocial"
            placeholder="Digite a url do facebook"
            type="url"
            value={facebook}
            onChange={ (e) => setFacebook(e.target.value)}
          />
        </label>

        <label htmlFor="inputSocial">
          Link do Instagram

          <Input
            id="inputSocial"
            placeholder="Digite a url do instagram"
            value={instagram}
            type="url"
            onChange={ (e) => setInstagram(e.target.value)}
          />
        </label>

        <label htmlFor="inputSocial">
          Link do Youtube

          <Input
            id="inputSocial"
            placeholder="Digite a url do youtube"
            value={youtube}
            type="url"
            onChange={ (e) => setYoutube(e.target.value)}
          />
        </label>

        <button type="submit" className='btnRegister'>
          Salvar Links <MdAddLink size={24} color="#FFF"/>
        </button>
      </form>
    </div>
  );
}
