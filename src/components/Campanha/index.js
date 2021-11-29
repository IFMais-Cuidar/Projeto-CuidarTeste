import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prismic from '@prismicio/client';

import './campanha.css';

export function Campanha({dados, children}) {


    const {campanhaAtual} = useParams();

    const [doc, setDocData] = useState(null);
    const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
    const Client = Prismic.client(apiEndpoint);

    useEffect(()=>{
        window.scrollTo(0,0);

        const fetchData = async() => {
        const response = await Client.query(
            Prismic.Predicates.at('document.type', 'campanha')
        )
        if (response){
            for (var i in response.results){
                if (response.results[i].slugs.toString() === campanhaAtual)
                    setDocData(response.results[i])
            }
        }
        }
        fetchData();

    },[]);  

  return (
      <>
      {doc ?        
        <>
        {dados.data.background.dimensions ? 
        <section id="campanha" style={{background:`url(${dados.data.background.url})`}}>            
            <div className="container containerCampanha">

                {/*<div className="row">
                    <div className="col-sm-12">
                        <h1> Sobre a Campanha </h1>
                    </div>
                    </div>*/}  

                <div className="row">
                    <div className="col-sm-6" >
                            <img src={doc.data.imagemcapa.url} alt={doc.data.imagemcapa.alt} className='img-responsive' />
                    </div>
                    <div className="col-sm-6">
                            <h1>Descrição:</h1>                                

                            {doc.data.descricaocampanha.map(
                                i => {
                                    return(
                                        <p>{i.text}</p>
                                    )
                                }
                            )}
                            
                            <span> {doc.data.periodo.text} </span>
                            <br style={{marginBottom:'2rem'}}/>
                            {/*<a href="#doacao" className="btn btn-success btn-lg">Clique aqui para doar!</a>*/}                            
                            
                    </div>  

                    <div className="col-sm-12" >
                            {children}
                    </div>

                </div>
            </div>
        </section>
        : 
        <section id="campanha" className={`bg-${dados.data.tipobotao[0].text}`}>
            <div className="container containerCampanha">   
                {/*<div className="row">
                    <div className="col-sm-12">
                        <h1> Sobre a Campanha </h1>
                    </div>
                    </div>*/}  

                <div className="row ">
                    <div className="col-sm-6 " >
                            <img src={doc.data.imagemcapa.url} alt={doc.data.imagemcapa.alt} className='img-responsive' />
                    </div>
                    <div className="col-sm-6 ">
                            <h1>Descrição:</h1>
                            <p>{doc.data.descricaocampanha[0].text}</p>
                            <span> {doc.data.periodo.text} </span>
                            <br style={{marginBottom:'2rem'}}/>
                            {/*<a href="#doacao" className="btn btn-success btn-lg">Clique aqui para doar!</a>*/}                            
                            
                    </div>  

                    <div className="col-sm-12" >
                            {children}
                    </div>

                </div>
            </div>
        </section>
        }
        </>
        : <div>Carregando...</div>}        
      </>
  );
}
