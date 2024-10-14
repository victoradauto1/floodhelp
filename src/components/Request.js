"use client";

import { closeRequest } from "@/services/web3Services";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import Web3 from "web3";
import {formatDistance} from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';

export default function Request({ data }) {
  function btnCloseClick() {
    if (!confirm("Tem certeza que deseja fechar este pedido?")) return;

    closeRequest(data.id)
      .then((result) => {
        alert("Pedido fechado com sucesso.");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  function btnHelpClick() {
    const donationBnb = prompt("Quanto você deseja doar(em BNB)?", 0);
    donate(data.id, donationBnb)
      .then(result=>{
        alert(`Doação de ${donationBnb} BNB efetuada com sucesso! Em alguns minutos ela será processada.`)
      })
      .catch(err=>{
        console.error(err)
        alert(err.message)
      })
  }

  return (
    <>
      <div className="list-grou-item list-group-item-action d-flex gap-3 py-3">
        <img
          src={generateAvatarURL(data.author)}
          width="32"
          height="32"
          className="rounded-circle"
        />
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div className="w-100">
            <div className="row">
              <div className="col-10">
                <h6 className="mb-0 text-nowrap">
                  {data.title}&rsaquo;&rsaquo; Contato: {data.contact}
                </h6>
              </div>
              <div className="col-2">
                <div className="text-end">
                  {localStorage.getItem("wallet") ===
                  data.author.toLowerCase() ? (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={btnCloseClick}
                    >
                      Fechar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={btnHelpClick}
                    >
                      &#36; Ajudar
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="opacity-75 pe-5 mb-0 me-5">{data.description}</p>
            <div className="row">
              <div className="col">
                <span className="me-1 opacity-75">Meta:</span>
                <span className="opacity-50">
                  {data.balance
                    ? `BNB ${Web3.utils.fromWei(
                        data.balance,
                        "ether"
                      )} obtidos de ${Web3.utils.fromWei(data.goal, "ether")}`
                    : `BNB ${Web3.utils.fromWei(data.goal, "ether")}`}
                </span>
              </div>
              <div className="col text-end">
                      <smal className="opacity-50 text-nowrap">Criado {formatDistance(new Date(Number(data.timestamp)* 1000), new Date(), {addSuffix: true, locale: ptBR})}</smal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
