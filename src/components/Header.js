"use client";
import {doLogin} from "@/services/web3Services";
import { useState, useEffect } from "react";

export default function Header() {
  const [message, setMessage] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setWallet(localStorage.getItem("wallet") | "");
  }, []);

  function btnLoginClick() {
    doLogin()
      .then((wallet) => alert(`Carteira ${wallet} conectada com sucesso!`))
      .catch((err) =>
        alert(`Não foi possível conectar a carteira. Erro: ${err.message}`)
      );
  }

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <a
            href="/"
            className="justify-content-start"
            style={{ textDecoration: "none" }}
          >
            <h1 className="fw-bold text-light">FloodHelp</h1>
          </a>
          <div className="text-end col-9"> 
            {wallet? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={btnLoginClick}
              >
                <img
                  src="/images/MetaMask_Fox.svg.png"
                  width="24"
                  className="me-3"
                />
                Entrar
              </button>
            )
            :
            <></>
            }
            <a href="/create" className="btn btn-warning">
              Pedir ajuda
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
