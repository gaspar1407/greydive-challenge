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
        <a
          href="https://firebase.google.com/?hl=es-419"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png"
            alt="logo firebase"
            className="logo-img"
          />
        </a>
        <h1 className="h-titulo">Challenge Firebase.</h1>
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
