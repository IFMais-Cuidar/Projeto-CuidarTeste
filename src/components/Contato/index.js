import React, { useState } from 'react';

//import credenciais from '../../assets/credenciais.json';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import './contato.css';

//npm install google-spreadsheet

const doc = new GoogleSpreadsheet(process.env.REACT_APP_ID_PLANILHA);
// const doc = new GoogleSpreadsheet('1JIfZ35clXAlV4XvbCsYbv7SiAiDqAPhWrasZW_KmwDU');

export function Contato({dados}){
    
    const [nome, setNome] = useState('');  
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');  
    const [msg, setMsg] = useState('');
    const [enviado, setEnviado] = useState(false);

    function handleChangeName(event){
        const value = event.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);    
        if (regMatch) {
            setNome(event.target.value)
        }
    }    

    function handleChangeEmail(event){
        setEmail(event.target.value);
    } 

    function handleChangeTel(event){
        const x = event.target.value
            .replace(/\D+/g, '')
            .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        setTel(!x[2] ? x[1] : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : ``))
    }   

    function handleChangeMsg(event){
        setMsg(event.target.value);
    }
  
    function limpaFormulario(){
        setNome('')
        setEmail('')
        setTel('')
        setMsg('')
    }

    async function handleSubmit(e){     
        e.preventDefault();        
        //console.log(credenciais.private_key);
        //console.log('-------------------');
        //console.log(`${process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n')}`);
        await doc.useServiceAccountAuth({
            client_email: process.env.REACT_APP_ID_CONTA,
            // client_email: 'testegooglesheets@carbon-ray-319517.iam.gserviceaccount.com',
            private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n') //credenciais.private_key
        })

        await doc.loadInfo(); 
        
	const rows = await doc.sheetsByIndex[0].getRows();

        await doc.sheetsByIndex[0].addRows([
            {
                'Código': rows.length + 1,
                'Nome': nome,
                'Email': email,
                'Telefone': tel,
                'Mensagem': msg,
            }
        ])

        setEnviado(true);
        limpaFormulario();
    }

    return(
        <>
            <section id="contato" style={{background:`url(${''})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="page-header"><h1>Contato <small>Fale conosco agora mesmo!</small></h1></div>
                        </div>
                    </div>
                    
                    <div className="row contato">
                        <div className="col-xs-12">
                            <p className={`bg-${dados.data.tipobotao[0].text} aviso`}>Preencha o formulário abaixo para entrar em contato conosco!</p>
                        </div>
                    </div>
                    
                    <div className="row contato">
                        <div className="col-xs-12">
                            
                            <form name="frmContato" id="formContato" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        
                                        <div className="form-group">
                                            <input type="text" onChange={handleChangeName} className="form-control input-lg" placeholder="Qual seu nome? *" value={nome} required />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="email" onChange={handleChangeEmail} className="form-control input-lg" placeholder="Qual seu e-mail? *" value={email} required />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="tel" onChange={handleChangeTel} className="form-control input-lg" placeholder="Seu telefone?" value={tel} />
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <textarea className="form-control input-lg" onChange={handleChangeMsg} placeholder="Sua mensagem! *" value={msg} required></textarea>
                                    </div>
                                </div> 
                                <div className="row">
                                    {enviado === true 
                                    ?
                                    <>
                                    <div className="col-sm-6">
                                        <div className={`alert alert-${dados.data.tipobotao[0].text}`}>Mensagem Enviada!</div>
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="submit" className={`btn btn-${dados.data.tipobotao[0].text} btn-lg`}>Enviar outra Mensagem</button>
                                    </div>
                                    </>
                                    :
                                    <div className="col-sm-12">
                                        <button type="submit" className={`btn btn-${dados.data.tipobotao[0].text} btn-lg`}>Enviar Mensagem</button>
                                    </div>
                                    }
                                    
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>      
        </>
    );
}