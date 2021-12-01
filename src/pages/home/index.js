import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';

import { NavBar } from "../../components/NavBar";

import { Header } from "../../components/Header";
import { Servicos } from "../../components/Servicos";
import { Campanhas } from "../../components/Campanhas";
import { QuemSomos } from "../../components/QuemSomos";
import { Localizacao } from "../../components/Localizacao";
import { Contato } from "../../components/Contato";

import { Footer } from "../../components/Footer";

import { Loading } from "../../components/Loading";

function Home() {

  const [doc, setDocData] = useState(null);
  const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
  const Client = Prismic.client(apiEndpoint);

  useEffect(()=>{
    window.scrollTo(0,0);

    const fetchData = async() => {
      const response = await Client.query(
          Prismic.Predicates.at('document.type', 'empresa')
      )
      if (response){
          setDocData(response.results[0]);
      }
    }
    fetchData(); 

  },[]); 

  return (
    <>{
      doc ?
        <>
          {/* {console.log(doc.data)} */}
          <NavBar dados={doc} /> 
          <Header dados={doc} />
          <Campanhas dados={doc} todas={false} />
          <Servicos dados={doc} todas={false} />
          <QuemSomos dados={doc} todas={false} />
          <Localizacao dados={doc} />
          <Contato dados={doc} />
          <Footer dados={doc} />
        </>
          :
        <Loading />
    }
      
    </>
  );
}

export default Home;