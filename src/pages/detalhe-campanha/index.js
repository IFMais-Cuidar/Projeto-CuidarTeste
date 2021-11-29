import React, { useEffect, useState } from 'react';
import Prismic from '@prismicio/client';

import { NavBar } from '../../components/NavBar';
import { Campanha } from '../../components/Campanha';
import { Galeria } from '../../components/Galeria';
//import { QuemSomos } from '../../components/QuemSomos';
import { Formulario } from '../../components/Formulario';
import { Footer } from '../../components/Footer';
import { Loading } from "../../components/Loading";

function DetalheCampanha() {

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
      <>
      {doc ? 
      <>
        <NavBar dados={doc}/>
        <Campanha dados={doc}>
            <Formulario dados={doc}/>
        </Campanha>
        <Galeria dados={doc}/>
        {/*<QuemSomos dados={doc} />*/}
        <Footer dados={doc}/>
      </>
      : <Loading />}
        
      </>
  );
}

export default DetalheCampanha;