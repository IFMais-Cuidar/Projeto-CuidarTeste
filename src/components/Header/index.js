import React from 'react';

import Carousel, { autoplayPlugin,slidesToShowPlugin } from '@brainhubeu/react-carousel'; //npm install @brainhubeu/react-carousel
import '@brainhubeu/react-carousel/lib/style.css';

import './header.css'

export function Header({dados}){
     
    return( 
        
        <>                
        {dados ? 
            <>
            {dados.data.background.dimensions ?
                <div style={{background:`url(${dados.data.background.url})`}}>            
                    <Carousel className="carousel divslider"
                        plugins={[
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 5000,
                                }
                            },                    
                        ]}
                        animationSpeed={1000}
                        breakpoints={{
                            900: {
                              plugins: [
                               {
                                 resolve: slidesToShowPlugin,
                                 options: {
                                  numberOfSlides: 1
                                 }
                               },
                             ]
                            }
                          }}
                    >
                        <img src={dados.data.imagemcapa1.url} alt={dados.data.imagemcapa1.alt}/>
                        <img src={dados.data.imagemcapa2.url} alt={dados.data.imagemcapa2.alt}/>
                        <img src={dados.data.imagemcapa3.url} alt={dados.data.imagemcapa3.alt}/> 
                    </Carousel>
                </div>
            : 
                <div className={`bg-${dados.data.tipobotao[0].text}`}>            
                    <Carousel className="carousel divslider"
                        plugins={[
                            'centered',
                            'arrows',
                            'infinite',
                            {
                                resolve: autoplayPlugin,
                                options: {
                                    interval: 5000,
                                }
                            },                    
                        ]}
                        animationSpeed={1000}
                        breakpoints={{
                            900: {
                              plugins: [
                               {
                                 resolve: slidesToShowPlugin,
                                 options: {
                                  numberOfSlides: 1
                                 }
                               },
                             ]
                            }
                          }}
                    >
                        <img src={dados.data.imagemcapa1.url} alt={dados.data.imagemcapa1.alt}/>
                        <img src={dados.data.imagemcapa2.url} alt={dados.data.imagemcapa2.alt}/>
                        <img src={dados.data.imagemcapa3.url} alt={dados.data.imagemcapa3.alt}/> 
                    </Carousel>
                </div>}        
            </>

            : <div>Carregando...</div>}     
        </>        
    );    
}

