"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Request from "@/components/Request";
import { getOpenRequests } from "@/services/web3Services";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    document.title = " FloodHelp| Home";
  }, []);

  useEffect(() => {
    loadRequest(lastId);
  }, [lastId]);

  async function loadRequest(lastId) {
    try {
      const result = await getOpenRequests(lastId);
      if (lastId === 0) {
        setRequests(result); // Inicializa os requests
      } else {
        // Atualiza os requests com novos valores sem mutar o estado
        setRequests((prevRequests) => [...prevRequests, ...result]);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function btnLoadMoreClick() {
    setLastId(Number(requests[requests.length - 1].id));
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">
            Ajude as vítimas de enchentes e demais desastres naturais pelo
            Brasil
          </p>
        </div>
        <div className="p-4 mx-5">
          <div className="list-group">
            {requests && requests.length ? (
              requests.map((rq) => <Request key={rq.id} data={rq} />)
            ) : (
              <p>
                Conecte sua carteira MetaMask no botão "entrar" para ajudar ou
                pedir ajuda.{" "}
              </p>
            )}
          </div>
          {requests && requests.length && requests.length % 10 === 0 ? (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={btnLoadMoreClick}
                className="btn btn-outline-dark btn-lg"
              >
                Mais resultados
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
