import React from 'react';

export function Footer({ dados }){
    return(
        <>
        {dados.data.background.dimensions ?
        <footer style={{background:`url(${dados.data.background.url})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <h5>Nosso Endereço: {dados.data.endereco[0].text}</h5>
                        <h5>Nosso Email: {dados.data.email[0].text}</h5>
                        <h5>Nosso Telefone:{dados.data.telefone[0].text}</h5>
                    </div>
                    <div className="col-sm-2 text-right">
                        <small>Desenvolvido por:</small><br/>
                        <strong>IFMG</strong>
                    </div>
                </div>  
            </div>
        </footer>
        :
        <footer className={`bg-${dados.data.tipobotao[0].text}`}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <h5>Nosso Endereço: {dados.data.endereco[0].text}</h5>
                        <h5>Nosso Email: {dados.data.email[0].text}</h5>
                        <h5>Nosso Telefone:{dados.data.telefone[0].text}</h5>
                    </div>
                    <div className="col-sm-2 text-right">
                        <small>Desenvolvido por:</small><br/>
                        <strong>IFMG</strong>
                    </div>
                </div>  
            </div>
        </footer>
        }
        </>
    );
}