"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { openRequest } from "@/services/web3Services";

export default function Create() {
  const [error, setError] = useState("");
  const [request, setRequest] = useState({
    title: "",
    description: "",
    contact: "",
    goal: "",
  });

  function onInputChange(e) {
    setRequest((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function btnSaveClick() {
    setError(""); // Limpa o erro anterior, se houver
    if (!request.title || !request.description || !request.contact) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      alert("Iniciando processo de salvamento... aguarde...");
      const result = await openRequest(request);
      console.log("Request:", request);
      console.log("Result:", result);
      alert("Pedido enviado com sucesso. Em alguns minutos estará disponível na página inicial.");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
      console.error("Erro ao enviar pedido:", err);
      console.log("Request:", request);
      alert("Erro ao enviar pedido: " + err.message);
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="ps-5">
          <div className="row my-3">
            <p className="lead">
              Preencha todos os campos abaixo para nos dizer o que você precisa.
            </p>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                id="title"
                className="form-control"
                maxLength={150}
                value={request.title}
                onChange={onInputChange}
                required
              />
              <label htmlFor="title">Resumo do que precisa:</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <textarea
                id="description"
                className="form-control"
                style={{ height: 100 }}
                value={request.description}
                onChange={onInputChange}
                required
              ></textarea>
              <label htmlFor="description">
                Descreva em detalhes o que você precisa para entregas presenciais:
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                id="contact"
                className="form-control"
                maxLength={150}
                value={request.contact}
                onChange={onInputChange}
                required
              />
              <label htmlFor="contact">Contato (e-mail ou telefone):</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                id="goal"
                className="form-control"
                value={request.goal}
                onChange={onInputChange}
                min="0"
                step="0.000000000000000001"
              />
              <label htmlFor="goal">
                Meta em ETH (deixe em branco caso deseje receber doação em cripto):
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-1 mb-3">
              <a href="/" className="btn btn-outline-dark col-12 p-3">
                Voltar
              </a>
            </div>
            <div className="col-5 mb-3 p-0">
              <button type="button" className="btn btn-dark col-12 p-3" onClick={btnSaveClick}>
                Enviar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <Footer />
    </>
  );
}