"use client";
import { doLogin } from "@/services/web3Services";
import { generateAvatarHTML, generateAvatarURL } from "@cfx-kit/wallet-avatar";
import { useEffect, useState } from "react";

export default function Header() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const storedWallet = localStorage.getItem("wallet");
    if (storedWallet) {
      setWallet(storedWallet);
    }
  }, []);

  async function btnLoginClick() {
    try {
      const connectedWallet = await doLogin();
      setWallet(connectedWallet);
      localStorage.setItem("wallet", connectedWallet);
      alert(`Carteira ${connectedWallet} conectada com sucesso!`);
    } catch (err) {
      alert(`Não foi possível conectar a carteira. Erro: ${err.message}`);
    }
  }

  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  function btnLogoutClick(){
    localStorage.removeItem("wallet");
    window.location.reload();
  }

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <h1 className="fw-bold text-light">FloodHelp</h1>
          </a>
          <div className="text-end  d-flex align-items-center ">
            {!wallet ? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={btnLoginClick}
              >
                <img
                  src="/images/MetaMask_Fox.svg.png"
                  width="24"
                  className="me-2"
                  alt="MetaMask logo"
                />
                Entrar
              </button>
            ) : (
             <>
              <button type="button"className="btn btn-outline-light me-2" onClick={btnLogoutClick}>
                <img src={generateAvatarURL(wallet)} width={20} height={20} className="rounded-circle me-2"/>
                {truncateAddress(wallet)}
              </button>
             </>
            )}
            <a href="/create" className="btn btn-warning">
              Pedir ajuda
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}