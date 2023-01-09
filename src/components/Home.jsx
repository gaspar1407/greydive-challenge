import React, { useState } from "react";
import Form from "./Form";
import "./estilos/Home.css";

export default function Home() {
  const [modal, setModal] = useState(false);
  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <div className="home-container">
      <div className="h1-container">
        <img
          src="https://uploads-ssl.webflow.com/612fcc289671bc539ecd004e/612ff6936ef1a98f2a9b29cf_logo-greydive-gris.png"
          alt="logo greydive"
          className="logo-img"
        />
        <h1 className="h-titulo">Challenge Greydive.</h1>
      </div>
      <div className="buton-container">
        <button
          className="botonVisitar"
          onClick={(e) => abrirModal(e)}
          /*  style={{
            width: "500px",
            marginTop: "30px",
            marginLeft: " 50px",
          }} */
        >
          Completar Formulario
        </button>
      </div>
      <Form setModal={setModal} modal={modal} />
    </div>
  );
}
