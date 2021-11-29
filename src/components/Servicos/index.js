import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Prismic from '@prismicio/client';

import "./servicos.css";

export function Servicos({todas, dados, showButton=true}){

    const [doc, setDocData] = useState(null);
    const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
    const Client = Prismic.client(apiEndpoint);
    
    useEffect(()=>{
        window.scrollTo(0,0);

        if(todas){
            const fetchData = async() => {
                const response = await Client.query(
                    Prismic.Predicates.at('document.type', 'servicos'),
                    { pageSize : 6 }
                )
                if (response){
                    setDocData(response.results);
                }
            }
            fetchData();

        } else {
            const fetchData = async() => {
                const response = await Client.query(
                    Prismic.Predicates.at('document.type', 'servicos'),
                    { pageSize : 3}
                )
                if (response){
                    setDocData(response.results);
                }
            }
            fetchData();
        }

    },[]); 

    return( 
        <>
        {doc ?
        <>
            {dados.data.background.dimensions ?
                <section id="servicos" style={{background:`url(${dados.data.background.url})`}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-header"><h1>Serviços <small>Conheça as nossas ações principais</small></h1></div>
                            </div>                 
                        </div>  
                        <div className="row">

                                {doc.map(
                                    (item) => {
                                        return( 
                                            <div className="col-sm-4 col-md-4 servicos_item" key={item.id}>
                                                <div><img src={item.data.imagem.url} className="img-responsive img-circle imagemServico" alt={item.data.imagem.alt}/></div>
                                                <h4>{item.data.titulo[0].text}</h4>
                                                <p>{item.data.descricao[0].text}</p>
                                            </div>
                                        )
                                    }
                                )}                   
                            
                        </div>
                        
                        { showButton &&
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                {/*<a href="/#" className="btn btn-default btn-lg servicos_btn_todososservicos">Clique aqui para <br />ver todos os nossos serviços</a>*/}
                                <Link to="/lista-servicos" className="btn btn-default btn-lg servicos_btn_todososservicos">Clique aqui para <br />ver todos os nossos serviços</Link>
                            </div>
                        </div>
                        }
                    </div>
                </section>    
            :
                <section id="servicos" className={`bg-${dados.data.tipobotao[0].text}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-header"><h1>Serviços <small>Conheça as nossas ações principais</small></h1></div>
                            </div>                 
                        </div>  
                        <div className="row">

                                {doc.map(
                                    (item) => {
                                        return( 
                                            <div className="col-sm-4 col-md-4 servicos_item" key={item.id}>
                                                <div><img src={item.data.imagem.url} className="img-responsive img-circle imagemServico" alt={item.data.imagem.alt}/></div>
                                                <h4>{item.data.titulo[0].text}</h4>
                                                <p>{item.data.descricao[0].text}</p>
                                            </div>
                                        )
                                    }
                                )}                   
                            
                        </div>
                        
                        { showButton &&
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                {/*<a href="/#" className="btn btn-default btn-lg servicos_btn_todososservicos">Clique aqui para <br />ver todos os nossos serviços</a>*/}
                                <Link to="/lista-servicos" className="btn btn-default btn-lg servicos_btn_todososservicos">Clique aqui para <br />ver todos os nossos serviços</Link>
                            </div>
                        </div>
                        }
                    </div>
                </section>
            }
        </>
        : <div>Carregando...</div>}
        
        </>
    );
}