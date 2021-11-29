import React from 'react';
import IFrame from 'react-iframe';

export function Localizacao({dados}){
 
    // Instalar biblioteca "react-iframe"
    // npm install react-iframe

    return(
        <>
        {dados.data.background.dimensions ?
        <section id="localizacao" style={{background:`url(${dados.data.background.url})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="page-header"><h1>Localização <small>Veja onde estamos</small></h1></div>
                    </div>  
                </div>
                <div className="row">                    
                    <div className="col-xs-12">
                        <IFrame url={dados.data.localizacao[0].text} width="100%" height="520" frameBorder="0" styles="border:0"></IFrame>
                    </div>
                </div>
            </div>
        </section> 
        :
        <section id="localizacao" className={`bg-${dados.data.tipobotao[0].text}`}>
            {/* {console.log(`bg-${dados.data.tipobotao[0].text}`)} */}
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="page-header"><h1>Localização <small>Veja onde estamos</small></h1></div>
                    </div>  
                </div>
                <div className="row">                    
                    <div className="col-xs-12">
                        <IFrame url={dados.data.localizacao[0].text} width="100%" height="520" frameBorder="0" styles="border:0"></IFrame>
                    </div>
                </div>
            </div>
        </section>    
        }
        </>
    );
}