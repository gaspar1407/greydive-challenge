import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./estilos/Respuestas.css";

export default function Respuestas() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const dbFire = getFirestore(appFirebase);
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(dbFire, "respuestas"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, []);

  return (
    <div className="respuestas-container">
      <div className="h1-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png"
          alt="logo greydive"
          className="logo-img"
        />
        <h1 className="h-titulo-rta">Respuestas</h1>
      </div>
      <div className="card-container">
        {lista.map((list) => (
          <div key={list.id} className="card">
            <h5>Nombre:</h5>
            <h4> {list.full_name}</h4>
            <br></br>
            <h5>Email: </h5>
            <h4>{list.email}</h4>
            <br></br>
            <h5>Fecha de Nacimiento:</h5>
            <h4> {list.birth_date}</h4>
            <br></br>
            <h5>Pais de Origen:</h5>
            <h4> {list.country_of_origin}</h4>
            <br></br>
          </div>
        ))}
      </div>
      <div className="buton-container-rta">
        <Link to="/">
          <button className="botonVolver">Volver al Home</button>
        </Link>
      </div>
    </div>
  );
}
