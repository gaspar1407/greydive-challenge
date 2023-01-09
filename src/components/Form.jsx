import React, { useState } from "react";
import db from "../db.json";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import appFirebase from "../credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./estilos/Form.css";

export default function Form({ setModal, modal }) {
  const dbFire = getFirestore(appFirebase);

  const [errors, setErrors] = useState({
    full_name: "Debe ingresar su nombre",
    email: "",
  });
  const [input, setInput] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
  });

  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setInput({
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
      terms_and_conditions: "",
    });
    setModal(false);
  };

  const validador = (inputs) => {
    let validations = {};
    const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
    const emailExpresion =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!inputs.full_name) {
      validations.full_name = "Debe ingresar su nombre";
    } else if (nameExpresion.test(inputs.full_name)) {
      validations.full_name = "Ingrese solo letras";
    } else if (!inputs.email) {
      validations.email = "Debe ingresar su email";
    } else if (!emailExpresion.test(inputs.email)) {
      validations.email = "Ingrese un email válido";
    }
    return validations;
  };

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setTerms(true);
    const errores = validador({ ...input, [e.target.name]: e.target.value });
    console.log(input);
    setErrors(errores);
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbFire, "respuestas"), {
        ...input,
        ...terms,
      });
    } catch (error) {
      console.log(error);
    }

    Swal.fire({
      title: "Formulario enviado correctamente",
      icon: "success",
      iconColor: "#d4034f",
      confirmButtonColor: "#d4034f",
      background: "#23252E",
      color: "#fff",
      confirmButtonText: "Ver Respuestas",
    }).then((result) => {
      navigate("/respuestas");
    });
    setInput({
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
      terms_and_conditions: false,
    });
    setTerms(false);
    setModal(false);
  };

  return (
    <Modal
      show={modal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="form-container"
    >
      <Modal.Header className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="https://uploads-ssl.webflow.com/612fcc289671bc539ecd004e/612ff6936ef1a98f2a9b29cf_logo-greydive-gris.png"
            alt="logo greydive"
            className="logo-modal"
          />
        </Modal.Title>
        <Button variant="secondary" onClick={handleClose}>
          x
        </Button>
      </Modal.Header>
      <form onSubmit={enviarForm} autoComplete="off">
        <Modal.Body>
          <div>
            {db.items.map((e) =>
              e.type === "text" ? (
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <input
                    type={e.type}
                    onChange={(e) => handleOnChange(e)}
                    name={e.name}
                    value={input.full_name}
                    className="formEmail"
                    required
                  ></input>
                  {errors.full_name ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        marginBottom: "0",
                      }}
                    >
                      {errors.full_name}
                    </p>
                  ) : null}
                </div>
              ) : e.type === "email" ? (
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <input
                    type={e.type}
                    name={e.name}
                    onChange={(e) => handleOnChange(e)}
                    value={input.email}
                    className="formEmail"
                    required
                  ></input>
                  {errors.email ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        marginBottom: "0",
                      }}
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              ) : e.type === "date" ? (
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <input
                    type={e.type}
                    name={e.name}
                    value={input.name}
                    onChange={(e) => handleOnChange(e)}
                    className="formEmail"
                    required
                  ></input>
                </div>
              ) : e.type === "select" ? (
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <select
                    className="formEmail"
                    name={e.name}
                    onChange={(e) => handleOnChange(e)}
                    value={input.country_of_origin}
                  >
                    <option>Pais de Origen:</option>
                    {e.options &&
                      e.options.map((e) => (
                        <option value={e.value}>{e.label}</option>
                      ))}
                  </select>
                </div>
              ) : e.type === "checkbox" ? (
                <label className="content-input">
                  <a
                    href="https://policies.google.com/terms?hl=es"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {e.label}
                  </a>
                  <input
                    type={e.type}
                    name={e.name}
                    value={terms}
                    onChange={(e) => handleOnChange(e)}
                    required
                  ></input>
                  <i></i>
                </label>
              ) : null
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div>
            {db.items.map((e) =>
              e.type === "submit" ? (
                <label>
                  <input type={e.type} className="buton-submit"></input>
                </label>
              ) : null
            )}
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}