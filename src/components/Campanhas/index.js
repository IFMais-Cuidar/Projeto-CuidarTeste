import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Prismic from '@prismicio/client';

import "./campanha.css";

export function Campanhas({dados, todas, showButton=true}){

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [qtdPaginas, setQtdPaginas] = useState(1);

    const [doc, setDocData] = useState(null);
    const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
    const Client = Prismic.client(apiEndpoint);   

    useEffect(()=>{

        if(todas){
            const fetchData = async() => {
                const response = await Client.query(
                    Prismic.Predicates.at('document.type', 'campanha'),
                    { pageSize : 6, page : paginaAtual, orderings: '[my.campanha.datacriacao desc]' }
                )
                if (response){
                    setDocData(response.results);
                    setPaginaAtual(response.page);
                    setQtdPaginas(response.total_pages);
                }
            }
            fetchData();
        } else {
            const fetchData = async() => {
                const response = await Client.query(
                    // Prismic.Predicates.at('document.type', 'campanha'),
                    Prismic.Predicates.at('my.campanha.ativa', true),
                    { pageSize : 6, orderings: '[my.campanha.datacriacao desc]' }
                )
                if (response){
                    setDocData(response.results);
                }
            }
            fetchData();
        }

    },[paginaAtual]); 



    return( 
        <>
        {doc ? <>
            <section id="campanha" style={{background:`url(${''})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="page-header"><h1>Campanhas <small>Conheça e <b>ajude</b> em nossas jornadas</small></h1></div>
                        </div>                
                    </div> 
                    
                    <div className='row campanha_row'>
                        {doc.map(
                            (item) => {
                                return( 
                                    <div className="col-sm-4" key={item.id}>                                        
                                        <div className="campanha_item">
                                            <div> 
                                                <Link to={`/campanha/${item.slugs}`}> 
                                                    <img src={item.data.imagemcapa.url} className="img-responsive capaCampanha" alt={item.data.imagemcapa.alt} /> 
                                                </Link>
                                            </div>
                                            <h4>{item.data.titulocampanha[0].text}</h4>
                                        </div> 
                                    </div>
                                )
                            }
                        )} 
                    </div>
                    { todas &&                     
                    <div className="row campanha_row"> 
                        {Array(qtdPaginas).fill('').map((_,index) => {
                                return <button key={index} 
                                               disabled={index === (paginaAtual - 1)}
                                               onClick={() => setPaginaAtual(index+1)}
                                               className={`btn btn-${dados.data.tipobotao[0].text}`}>{index +  1}</button>
                            })}
                    </div>
                    }        

                    { showButton &&
                    <div className="row">
                        <div className="col-xs-12 text-center">
                            {/*<a href="/#" className="btn btn-default btn-lg">Clique aqui para conhecer <br />todas as nossas campanhas</a>*/}
                            <Link to="/lista-campanhas" className="btn btn-default btn-lg">Clique aqui para conhecer <br />todas as nossas campanhas</Link>
                        </div>
                    </div>}
                </div>
            </section>
            </> : <div>Carregando...</div>}
        </>
    );
}