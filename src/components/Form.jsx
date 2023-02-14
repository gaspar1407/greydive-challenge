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
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: false,
  });

  const [input, setInput] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
  });

  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();

  //funcion para cerrar el formulario y setear los inputs a vacios
  const handleClose = () => {
    setInput({
      full_name: "",
      email: "",
      birth_date: "",
      country_of_origin: "",
    });
    setTerms(false);
    setModal(false);
  };

  //funcion para verificar los errores
  const validador = (inputs) => {
    let validations = {};
    const nameExpresion = /[0-9/'0-9'/,*+._&=():;%$#!|-]/gi;
    const emailExpresion =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const DATE_REGEX =
      /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

    if (!inputs.full_name) {
      validations.full_name = "Debe ingresar su nombre";
    } else if (nameExpresion.test(inputs.full_name)) {
      validations.full_name = "Ingrese solo letras";
    } else if (!inputs.email) {
      validations.email = "Debe ingresar su email";
    } else if (!emailExpresion.test(inputs.email)) {
      validations.email = "Ingrese un email válido";
    } else if (!inputs.birth_date) {
      validations.birth_date = "Ingrese una fecha";
    } else if (!DATE_REGEX.test(inputs.birth_date)) {
      validations.birth_date = "Ingrese una fecha válida";
    } else if (parseInt(inputs.birth_date.split("-")[0]) > 2022) {
      validations.birth_date = "Ingrese una fecha válida";
    } else if (parseInt(inputs.birth_date.split("-")[0]) < 1900) {
      validations.birth_date = "Ingrese una fecha válida";
    } else if (!inputs.country_of_origin) {
      validations.country_of_origin = "Debe ingresar su Pais";
    } else if (!inputs.terms_and_conditions) {
      validations.terms_and_conditions = "Acepte los terminos y condiciones";
    } else if (inputs.terms_and_conditions === "true") {
      validations.terms_and_conditions = "Acepte los terminos y condiciones";
    }

    return validations;
  };

  //funcion que modifica el estado con los datos ingresados y verifica errores
  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "terms_and_conditions") {
      if (terms === false) {
        setTerms(true);
      } else {
        setTerms(false);
      }
    }

    const errores = validador({
      ...input,
      [e.target.name]: e.target.value,
    });
    /*  console.log("Soy Inputs", input);
    console.log("Soy Errors", errores); */
    setErrors(errores);
  };

  //funcion para enviar el form a la db
  //muestra el mensaje si todo salio bien
  //setea los inputs
  const enviarForm = async (e) => {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      return Swal.fire({
        title: "Existen Errores",
        icon: "error",
        iconColor: "#d4034f",
        confirmButtonColor: "#d4034f",
        background: "#23252E",
        color: "#fff",
        confirmButtonText: "volver a intentar",
      }).then((result) => {
        navigate("/");
      });
    } else {
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
        iconColor: "#f1cf70",
        confirmButtonColor: "#f1cf70",
        background: "#c0c0c0",
        color: "#fff",
        confirmButtonText: "Ver Respuestas",
      }).then((result) => {
        setInput({
          full_name: "",
          email: "",
          birth_date: "",
          country_of_origin: "",
        });
        setTerms(false);
        setModal(false);
        navigate("/respuestas");
      });
    }
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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Firebase_Logo.svg/1280px-Firebase_Logo.svg.png"
            alt="logo firebase"
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
                <div className="contenedorInpputs" key={e.name}>
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
                <div className="contenedorInpputs" key={e.name}>
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
                <div className="contenedorInpputs" key={e.name}>
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <input
                    type={e.type}
                    name={e.name}
                    value={input.birth_date}
                    onChange={(e) => handleOnChange(e)}
                    className="formEmail"
                    required
                  ></input>
                  {errors.birth_date ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        marginBottom: "0",
                      }}
                    >
                      {errors.birth_date}
                    </p>
                  ) : null}
                </div>
              ) : e.type === "select" ? (
                <div className="contenedorInpputs" key={e.name}>
                  <label className="tituloInput">
                    <b>{e.label}</b>
                  </label>
                  <select
                    className="formEmail"
                    name={e.name}
                    onChange={(e) => handleOnChange(e)}
                    value={input.country_of_origin}
                    required
                  >
                    <option selected hidden>
                      Pais de Origen:
                    </option>
                    {e.options &&
                      e.options.map((e) => (
                        <option value={e.value} key={e.label}>
                          {e.label}
                        </option>
                      ))}
                  </select>
                  {errors.country_of_origin ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        marginBottom: "0",
                      }}
                    >
                      {errors.country_of_origin}
                    </p>
                  ) : null}
                </div>
              ) : e.type === "checkbox" ? (
                <label className="content-input" key={e.name}>
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
                  {errors.terms_and_conditions ? (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        marginBottom: "0",
                      }}
                    >
                      {errors.terms_and_conditions}
                    </p>
                  ) : null}
                </label>
              ) : null
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="btn-container">
            {db.items.map((e) =>
              e.type === "submit" ? (
                <label key={e.label}>
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
