import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADRESS = "0x79742535Bd20e70E76ECC4fCB7C8e92d24F85bdD";

function getcontract() {
  if (!window.ethereum) throw new Error("Não há MetaMask instalada.");

  const from = localStorage.getItem("wallet");
  const web3 = new Web3(window.ethereum);

  return new web3.eth.Contract(ABI, CONTRACT_ADRESS, { from });
}

export async function doLogin() {
  if (!window.ethereum) throw new Error("Não há MetaMask instalada.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length) throw new Error("Carteira não permitida.");

  localStorage.setItem("wallet", accounts[0].toLowerCase());
  return accounts[0];
}

export async function getOpenRequests(lastId = 0) {
  const contract = getcontract();
  const requests = await contract.methods
    .getOpenRequests(lastId + 1, 10)
    .call();

  return requests.filter((rq) => rq.title != "");
}

export async function openRequest({ title, description, contact, goal }) {
  const contract = getcontract();
  const etherGoal = goal ? Web3.utils.toWei(goal.toString(), "ether") : "0";
  
  return contract.methods
    .openRequest(title, description, contact, etherGoal)
    .send();
}

export async function closeRequest(id){
  contract = getcontract();
  return contract.methods.closeRequest(id).send();
}

export async function donate(id, donationInBnb){
  contract = getcontract();
  return contract.methods.closeRequest(id).send({
    value: Web3.utils.toWei(donationInBnb, "ether")
  });
}