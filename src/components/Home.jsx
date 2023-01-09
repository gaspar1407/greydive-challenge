import React, { useState } from "react";
import Form from "./Form";
import "./estilos/Home.css";

export default function Home() {
  //declaro los estados para abrir el formulario.
  const [modal, setModal] = useState(false);

  //funcion que setea el estado en true cuando se activa el boton para ver el formulario.
  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <div className="home-container">
      <div className="h1-container">
        <a href="https://www.greydive.com/" target="_blank" rel="noreferrer">
          <img
            src="https://uploads-ssl.webflow.com/612fcc289671bc539ecd004e/612ff6936ef1a98f2a9b29cf_logo-greydive-gris.png"
            alt="logo greydive"
            className="logo-img"
          />
        </a>
        <h1 className="h-titulo">Challenge Greydive.</h1>
      </div>
      <div className="buton-container">
        <button className="botonVisitar" onClick={(e) => abrirModal(e)}>
          Completar Formulario
        </button>
      </div>
      <Form setModal={setModal} modal={modal} />
    </div>
  );
}
