import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Prismic from '@prismicio/client';

import './quemsomos.css';

export function QuemSomos({dados, todas, showButton=true}){

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [qtdPaginas, setQtdPaginas] = useState(1);

    const [doc, setDocData] = useState(null);
    const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
    const Client = Prismic.client(apiEndpoint);   

    useEffect(()=>{

        if(todas){
            const fetchData = async() => {
                const response = await Client.query(
                    Prismic.Predicates.at('document.type', 'equipe'),
                    { pageSize : 8, page : paginaAtual}
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
                    Prismic.Predicates.at('document.type', 'equipe'),
                    { pageSize : 4 }
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
        {doc ? 
        <>
        <section id="quemsomos" style={{background:`url(${''})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="page-header"><h1>Quem Somos <small>Conheça nossa história</small></h1></div>
                    </div> 
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="col-sm-8 text-right">
                            <h4>Texto sobre a empresa</h4>
                            <p>{dados.data.textoexplicativo[0].text}</p>
                            {/* {console.log(dados.data)} */}
                        </div>
                        <div className="col-sm-4">
                            <img src={dados.data.imagem1.url} className="img-responsive img-circle"  alt="Empresa"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-sm-4">
                            <img src={dados.data.imagem2.url} className="img-responsive img-circle" alt="Empresa"/>
                        </div>
                        <div className="col-sm-8">
                            <h4>Missão da empresa</h4>
                            <p>{dados.data.missaodaempresa[0].text}</p>
                            
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-xs-12">
                        <div className="page-header"><h1>Nossa Equipe <small>Conheça alguns dos nossos colaboradores</small></h1></div>
                    </div> 
                </div>
                
                <div className="row">

                    {doc.map(
                        (item) => {
                            return( 
                                <div className="col-sm-3" key={item.id}>
                                    <div>
                                        <div><img src={item.data.foto.url} className="img-responsive foto" alt={item.data.foto.alt}/></div>
                                        <h4>{item.data.nome.text}</h4>
                                    </div>
                                </div>
                            )
                        }
                    )} 
                    
                </div>

                { todas &&                     
                    <div className="row funcionarios"> 
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
                    <div className="col-xs-12 text-center" style={{paddingTop:"2rem"}}>
                        {/*<a href="/#" className="btn btn-default btn-lg" >Clique aqui para conhecer <br />melhor a empresa</a>*/}
                        <Link to="/lista-quemsomos" className="btn btn-default btn-lg" >Clique aqui para conhecer <br />melhor a empresa</Link>
                    </div>
                </div>
                }

            </div>
        </section>
        </>
        : <div>Carregando...</div>
        }        
        </>
    );
}