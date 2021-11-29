import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prismic from '@prismicio/client';

import './galeria.css';

export function Galeria({dados}){

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

    return(
        <>
            <section id="galeria" style={{background:`url(${''})`}}>                
                <div className="container galeriaContainer">
                    <div className="row">
                        <div className="col-sm-12"> 
                            <h1> Galeria de Fotos</h1>
                        </div>                        
                    </div>                    
                    {doc ? <>

                    <div className="row">
                        <div className="col-sm-12 galeriaImagens"> 
                            {doc.data.fotos.map(
                                item => {
                                    return(
                                        <div className="col-sm-3" key={item.fotocampanha.url}>
                                            <img src={item.fotocampanha.url} className="img-responsive" alt={item.fotocampanha.alt} />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    </>
                    : <div> Carregando ... </div>}                          

                </div>
            </section>
        </>
    );
}
