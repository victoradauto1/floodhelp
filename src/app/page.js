"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = " FloodHelp| Home";
  }, []);

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
        <div className="p-4 mx-5"></div>
        <Footer />
      </div>
    </>
  );
}
