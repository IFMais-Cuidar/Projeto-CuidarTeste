import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';

import { Loading } from "../../components/Loading";

//import credenciais from '../../assets/credenciais.json';
import { GoogleSpreadsheet } from 'google-spreadsheet';

import pix from '../../assets/imgs/pix.png';
import cartao from '../../assets/imgs/cartao.png';
import boleto from '../../assets/imgs/boleto.png';
import Prismic from '@prismicio/client';
import { useParams } from 'react-router-dom';

import apiPix from "../../service/pix";
import apiBoleto from "../../service/boleto";
import apiCartaoCredito from "../../service/cartaoCredito";
import apiCarne from "../../service/carne";

import './formulario.css';
import 'react-credit-cards/es/styles-compiled.css';

//npm install google-spreadsheet
//npm install react-credit-cards

const doc = new GoogleSpreadsheet(process.env.REACT_APP_ID_PLANILHA);

export function Formulario({dados}){
    
    const [dataQrCode, setDataQrCode] = useState('');
    const [doando, setDoando] = useState(false);

    const {campanhaAtual} = useParams();

    const [docCampanha, setDocData] = useState(null);
    const apiEndpoint = process.env.REACT_APP_API_PRISMIC;
    const Client = Prismic.client(apiEndpoint);

    const [nome, setNome] = useState('');  
    const [cpf, setCpf] = useState('');
    const [tel, setTel] = useState('');
    const [valor, setValor] = useState('R$ 1,00');

    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [rua, setRua] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('MG');
    
    const [qtdParcelas, setQtdParcelas] = useState('2');

    const [opcaoPagamento, setOpcaoPagamento] = useState('PIX');

    const [opcaoPix, setOpcaoPix] = useState(true);
    const [opcaoCartao, setOpcaoCartao] = useState(false);
    const [opcaoCarne, setOpcaoCarne] = useState(false);
    const [opcaoBoleto, setOpcaoBoleto] = useState(false);

    const [salvarDados, setSalvarDados] = useState(true);  
    const [jaDoou, setJaDoou] = useState(false);

    const [nomeCartao, setNomeCartao] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [validade, setValidade] = useState('');
    const [cvc, setCvc] = useState('');
    const [expirationMonth, setExpirationMonth] = useState('');
    const [expirationYear, setExpirationYear] = useState('');
    const [focused, setFocused] = useState('');
   

    function handleChangeEstado(event) {
        const value = event.target.value;
        const regMatch = /^[a-zA-Z]*$/.test(value);    
        if (regMatch) {
            setEstado(value)
        }
    }

    function handleChangeParcelas(event) {
        const value = event.target.value;
        const regMatch = /^[0-9]*$/.test(value);    
        if (regMatch) {
            setQtdParcelas(value)
        }
    }
    

    function handleChangeCidade(event) {
        const value = event.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);    

        if (regMatch) {
            setCidade(value)
        }
    }
    function handleChangeCep(event) {
        //const regMatch = ""      
        
        // Precisa de um regex para o cep,
        // porém deve se atentar aos dados enviados ao gerencia net
        // pois o cep a ser enviado para la, sao somente os numeros
        // sem . e sem - .... exemplo -> 35555000

        //if (regMatch) {
            //setCep(value)
        //}

        const x = event.target.value.replace(/\D+/g, '').match(/(\d{0,5})(\d{0,3})/);        
        setCep(`${x[1]}` + (x[2] ? `-${x[2]}` : ``))
    }
    function handleChangeBairro(event) {
        const value = event.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);    

        if (regMatch) {
            setBairro(value)
        }
    }
    function handleChangeNumeroCasa(event) {
        const value = event.target.value;
        const regMatch = /^[0-9]*$/.test(value);    

        if (regMatch) {
            setNumeroCasa(value)
        }
    }
    function handleChangeRua(event) {
        const value = event.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);    

        if (regMatch) {
            setRua(value)
        }
    }
    
    function handleChangeEmail(event) {
        const value = event.target.value;
        //Precisa de um regex para email padrao ... teste@gmail.com
        // if (regMatch){
            setEmail(value)
        // }
    }
    function handleChangeDataNascimento(event) {
        //Precisa de um regex 
        // EXEMPLO DE DATA ACEITA PELA GERENCIA NET = 2019-06-28 -> yyyy-MM-dd
        // if (regMatch) {
        //    setDataNascimento(value)
        // }

        const x = event.target.value.replace(/\D+/g, '').match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/);
        //console.log(x)
        setDataNascimento(
            (//Dia
                (x[1]) < 4 ? `${x[1]}` : ``) // Garante que o primeiro digito esta entre 0 e 3
                +(
                    (x[1] === '0' && x[2] !== '0' ? `${x[2]}` : ``) // Garante que o dia 00 nao existe
                    ||
                    (x[1] === '1' || x[1] === '2' ? `${x[2]}` : ``) // Caso normal
                    ||
                    (x[1] === '3' ? (x[2] < 2 ? `${x[2]}` : ``) : ``) // Garante que o dia 32 pra cima nao exista
                ) 

            //Mes
            +(x[3] && x[3] < 2 ? `-${x[3]}` : ``) // Primeiro digito do mes pode ser 0 e 1
            +(x[3] === '0' ? (x[4] !== '0' ?`${x[4]}`: ``) : (x[4] < 3 ? `${x[4]}` : ``)) // Se for zero, o segundo digito vai até 9, se nao vai até 2
            +
            //Ano            
            (x[5] === '1' || x[5] === '2' ? `-${x[5]}` : ``) // Primeiro digito 1 ou 2

            +(x[5] === '1' && x[6] === '9' ? `${x[6]}` : ``) // Se o primeiro digito for 1, o segundo deve ser 9
            +(x[5] === '1' ? `${x[7]}` : ``) + (x[5] === '1' ? `${x[8]}` : ``)
            
            +(x[5] === '2' && x[6] === '0' ? `${x[6]}` : ``)// Se o primeiro digito for 2, o segundo deve ser 0
            +(x[5] === '2' && x[7] < 2 ? `${x[7]}` : ``)
            +(x[5] === '2' ? `${x[8]}` : ``)

            );
        
    }

    function handleChangeName(event){
        const value = event.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);    
        if (regMatch) {
            setNome(event.target.value)
        }
    }
    
    function handleChangeCpf(event){        
        const x = event.target.value.replace(/\D+/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);        
        setCpf(`${x[1]}` + (x[2] ? `.${x[2]}` : ``) + (x[3] ? `.${x[3]}` : ``) + (x[4] ? `-${x[4]}` : ``))
    } 

    function handleChangeTel(event){
        const x = event.target.value
            .replace(/\D+/g, '')
            .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        setTel(!x[2] ? x[1] : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : ``))
        
    } 

    function handleChangeValor(event){
        const x = event.target.value
        .match(/(^[R][$] )(\d{1,20})(,)(\d{2,3}$)/);


        // Encontra se um problema no regex do valor, 
        // pois eu consigo inserir espacos no meio dos valores, 
        // e isso pode dar muito problema .
        // exemplo de regex para o valor ---> R$ 199,25
        // quando eu chamo a funcao callApi... eu modifico o valor retirando o 
        // R$ e retirando a virgula, posteriormente eu transformo tudo em inteiro
        // pois a gerencia net aceita estes valores somente em inteiro
        // exemplo do valor acima ----> 19925
        

        if(x && Number(x[2].replace(/^00+/, '0') + x[3].replace(",",".") + x[4][0] + x[4][1]) >= 1){
            setValor(x[1] + x[2].replace(/^00+/, '0') + x[3] + x[4][0] + x[4][1]);
        //    setValor(x);
        }
        
    }

    function handleChangeOpcaoPagamento(event){
        
        if (event.target.value==="PIX"){
            setOpcaoPix(true)
            setOpcaoCartao(false)
            setOpcaoBoleto(false)
            setOpcaoCarne(false)
            setOpcaoPagamento('PIX')

            setNomeCartao('')
            setNumeroCartao('')
            setValidade('')
            setCvc('')

        } else if (event.target.value==="CARTAO"){
            setOpcaoPix(false)
            setOpcaoCartao(true)
            setOpcaoBoleto(false)
            setOpcaoCarne(false)
            setOpcaoPagamento('CARTAO')

        } else if (event.target.value==="BOLETO"){
            setOpcaoPix(false)
            setOpcaoCartao(false)
            setOpcaoBoleto(true)
            setOpcaoCarne(false)
            setOpcaoPagamento('BOLETO')

            setNomeCartao('')
            setNumeroCartao('')
            setValidade('')
            setCvc('')
            setFocused('name')

        } else if (event.target.value==="CARNE"){
            setOpcaoPix(false)
            setOpcaoCartao(false)
            setOpcaoBoleto(false)
            setOpcaoCarne(true)
            setOpcaoPagamento('CARNE')

            setNomeCartao('')
            setNumeroCartao('')
            setValidade('')
            setCvc('')
            setFocused('name')
        }        
        
    } 

    function handleChangeSalvarDados(){
        setSalvarDados(!salvarDados);        
    } 

    function limpaFormulario(){
        setNome('');
        setCpf('');
        setTel('');
        setValor('R$ 1,00');
        // @paulox
        // Comentei essa parte, pois ao fazer uma transacao pix,
        // esta limpando as opcoes, com isso o QrCode nao aparece na tela. 
        // setOpcaoPix(false);
        // setOpcaoCartao(false);
        // setOpcaoBoleto(false);
        // setSalvarDados(false);
    }

    function changeFocus(e){
        setFocused(e.target.name);
    }

    function changeNumeroCartao(e){
        const x = e.target.value
            .replace(/\D+/g, '')
        setNumeroCartao(x)

    }

    function changeNomeCartao(e){
        const value = e.target.value;
        const regMatch = /^[a-zA-Z ]*$/.test(value);
    
        if (regMatch) {
            setNomeCartao(e.target.value)
        }
    }
    
    function changeValidade(e){
        const x = e.target.value
            .replace(/\D+/g, '')    
        
        var mes1 = ""
        if (x[0] && x[0] < 2){
            mes1 = x[0]
        }

        var mes2 = ""
        if (x[1] !== '0' && x[0] === '0'){
            mes2 = x[1]
        } else if (x[0] === '1' && x[1] < 3){
            mes2 = x[1]
        }
        setExpirationMonth(x[0]+x[1])
        setExpirationYear("20"+x[2]+x[3])
        setValidade((x[0] ? `${mes1}` : ``) + (x[1] ? `${mes2}` : ``) + (x[2] ? `/${x[2]}` : ``) + (x[3] ? `${x[3]}` : ``)) 
    }

    function changeCVC(e){
        const x = e.target.value
            .replace(/\D+/g, '')
        setCvc(x)
    }

    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;        
        var i = 0;        
        
        strCPF = strCPF.replace(".","").replace(".","").replace("-","")

        if (strCPF === "00000000000") return false;

        for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10)) ) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))  Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }

    async function handleSubmit(e){     ////////////////////////////
        e.preventDefault();

        if(TestaCPF(cpf) === false){
            alert("CPF INVÁLIDO")
            return;
        }

        setDoando(true)


        if (opcaoPagamento === "BOLETO") {
            callApiBoleto()
        } else if (opcaoPagamento === "CARNE") {
            calApiCarne()
        } else if (opcaoPagamento === "PIX") {
            callApiPix()
        } else if (opcaoPagamento === "CARTAO") {
            callApiCartao()
        }
        await doc.useServiceAccountAuth({
            client_email: process.env.REACT_APP_ID_CONTA,
            private_key: process.env.REACT_APP_PRIVATE_KEY.replace(/\\n/g, '\n')  //credenciais.private_key
        })

        await doc.loadInfo(); 
        
        const rows = await doc.sheetsByIndex[1].getRows();
        
        await doc.sheetsByIndex[1].addRows([
            {
                'Código': rows.length + 1,
                'Nome': nome,
                'CPF': cpf,
                'Telefone': tel,
                'Opção de Pagamento': opcaoPagamento,
                'Salvar Dados' : salvarDados,
                'Valor' : valor,
                'Nome do Titular' : nomeCartao,
                'Número do Cartão' : numeroCartao,
                'Validade' : validade,
                'CVC' : cvc,
            }
        ])

        setDoando(false)
        !opcaoPix ? setJaDoou(true) : <></>
        limpaFormulario();

    }

    function retornaBandeira(number) {
        number = number.replace(/[^0-9]+/g, '');
        var cards = {
            visa      : /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard : /^5[1-5][0-9]{14}/,
            diners    : /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
            amex      : /^3[47][0-9]{13}/,
            discover  : /^6(?:011|5[0-9]{2})[0-9]{12}/,
            hipercard  : /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
            elo        : /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
            jcb        : /^(?:2131|1800|35\d{3})\d{11}/,        
            aura      : /^(5078\d{2})(\d{2})(\d{11})$/      
        };

        for (var flag in cards) {
            if(cards[flag].test(number)) {
                return flag;
            }
        }        

        return false;
    }


    // * COMECO CHAMADA API * //
    async function callApiCartao(){
        // Tratando algumas variaveis, 'adequando ela ao gerencia net'
        var valorAux = valor.replace("R$ ", "").replace(",", "")
        var cpfAux = cpf.replace(".", "").replace("-", "").replace(".", "")
        var telAux = tel.replace("(", "").replace(") ", "").replace("-", "")
        var cepAux = cep.replace("-","");
        var dataAux = dataNascimento.split("-");
        dataAux = dataAux[2] + "-" + dataAux[1] + "-" + dataAux[0];
        // Criando o objeto contendo os dados do doador
        var obj = {
            nome: nome,
            cpf: cpfAux,
            telefone: telAux,
            rua: rua,
            numero: parseInt(numeroCasa,10),
            cep: cepAux,
            bairro: bairro,
            email: email,
            dataNascimento: dataAux,
            cidade: cidade,
            estado: estado,
            campanha: {
                nome: docCampanha.data.titulocampanha[0].text,
                descricao: docCampanha.data.descricaocampanha[0].text,
                valor: parseInt(valorAux,10),
            },
            paymentToken: null
        }
        // Criando o objeto contendo os dados do cartao do doador
        var dadosCartao = {
            nomeCartao,
            numeroCartao,
            bandeira: retornaBandeira(numeroCartao),
            expiracaoMes: expirationMonth,
            expiracaoAno: expirationYear,
            cvc
        }

        // chamando a funcao responsavel por fazer todos 
        // os processos da transacao atraves do cartao de credito
        var response = await apiCartaoCredito(obj, dadosCartao)
        await actionResponse("CARTAO", response)

    }

    async function calApiCarne(){
        var valorAux = valor.replace("R$ ", "").replace(",", "")
        var cpfAux = cpf.replace(".", "").replace("-", "").replace(".", "")
        var telAux = tel.replace("(", "").replace(") ", "").replace("-", "")
        var obj = {
            nome: nome,
            cpf: cpfAux,
            telefone: telAux,
        }

        var campanha = {
            nome: docCampanha.data.titulocampanha[0].text,
            descricao: docCampanha.data.descricaocampanha[0].text,
            valor: valorAux,
            qtdParcelas: qtdParcelas, 
        }
        var response = await apiCarne(obj, campanha)
        await actionResponse("CARNE", response)
    }

    async function callApiPix(){
        var valorAux = valor.replace("R$ ", "").replace(",", ".")
        var response = await apiPix(valorAux)
    
        await actionResponse("PIX", response)
        
    }

    async function callApiBoleto(){
        var valorAux = valor.replace("R$ ", "").replace(",", "")
        var cpfAux = cpf.replace(".", "").replace("-", "").replace(".", "")
        var telAux = tel.replace("(", "").replace(") ", "").replace("-", "")
        var obj = {
            nome: nome,
            cpf: cpfAux,
            telefone: telAux,
        }

        var campanha = {
            nome: docCampanha.data.titulocampanha[0].text,
            descricao: docCampanha.data.descricaocampanha[0].text,
            valor: valorAux,
        }

        var response = await apiBoleto(obj, campanha)
        await actionResponse("BOLETO", response)
    }


    function actionResponse(op, response){
        if (op === "PIX") {
            if (response.status === 200){
                setDataQrCode(response.data)      
            }
        }
        else if (op === "BOLETO") {
            if (response.status === 200){
                window.open(response.data) 
            }
        }
        else if (op === "CARTAO") {
            if (response.status === 200) {
                console.log(response.data)
            }
        }
        else if (op === "CARNE") {
            if (response.status === 200){
                window.open(response.data.pdfCarnet) 
            }
        }
    }    
    // * FIM CHAMADA API * //
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
           {/* <section id="doacao" style={{background:`url(${fundo})`}}> */}
            {doando ? <Loading/> : 
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-12">
                            <div className="page-header"><h1>Doação <small>Faça a sua doação agora mesmo!</small></h1></div>
                        </div>
                    </div>
                    
                    <div className="row formDoacao">
                        <div className=" col-sm-8 col-md-12">
                            <p className={`bg-${dados.data.tipobotao[0].text} aviso`}>Preencha os dados abaixo para realizar a doação!</p>
                        </div>
                    </div>
                    
                    <div className="row formDoacao">
                        <div className="col-xs-12">
                            
                            <form name="frmDoacao" id="formularioDoacao" onSubmit={handleSubmit} autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-8 col-md-12">                                       
                                        
                                        <div className="form-group">
                                            <input type="text" onChange={handleChangeName} value={nome} className="form-control input-lg" placeholder="Qual seu nome? *" required />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="text" onChange={handleChangeCpf} value={cpf} name="formCPF" className="form-control input-lg" maxLength="14" placeholder="Qual seu CPF?*" required />                                            
                                        </div>

                                        <div className="form-group">
                                            <input type="tel"  onChange={handleChangeTel} value={tel} name="formTel"  className="form-control input-lg" maxLength="15" placeholder="Qual seu telefone? *" required/>
                                        </div>

                                        {opcaoCartao ?
                                            <>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeDataNascimento} value={dataNascimento} className="form-control input-lg" placeholder="Qual é sua data de nascimento? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" onChange={handleChangeEmail} value={email} className="form-control input-lg" placeholder="Qual é o seu E-mail? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeRua} value={rua} className="form-control input-lg" placeholder="Qual o nome da sua rua? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeNumeroCasa} value={numeroCasa} className="form-control input-lg" placeholder="Qual é o número da sua casa? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeBairro} value={bairro} className="form-control input-lg" placeholder="Qual é o nome do seu bairro? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeCep} value={cep} className="form-control input-lg" placeholder="Qual é o cep da sua cidade? *" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" onChange={handleChangeCidade} value={cidade} className="form-control input-lg" placeholder="Qual é o nome da sua cidade? *" required />
                                                </div>
                                                
                                                <div style={{marginTop:"1rem", marginBottom:"1rem"}}>
                                                    <label style={{marginRight:"0.5rem"}}>Estado:</label>
                                                    <select onChange={handleChangeEstado} value={estado} name="estado" className="input-lg">
                                                        <option>AC</option>
                                                        <option>AL</option>
                                                        <option>AP</option>
                                                        <option>AM</option>
                                                        <option>BA</option>
                                                        <option>CE</option>
                                                        <option>DF</option>
                                                        <option>ES</option>
                                                        <option>GO</option>
                                                        <option>MA</option>
                                                        <option>MT</option>
                                                        <option>MS</option>
                                                        <option>MG</option>
                                                        <option>PA</option>
                                                        <option>PB</option>
                                                        <option>PR</option>
                                                        <option>PE</option>
                                                        <option>PI</option>
                                                        <option>RR</option>
                                                        <option>RO</option>
                                                        <option>RJ</option>
                                                        <option>RN</option>
                                                        <option>RS</option>
                                                        <option>SC</option>
                                                        <option>SP</option>
                                                        <option>SE</option>
                                                        <option>TO</option>
                                                    </select>   
                                                </div>
                                            </>
                                            :null
                                        }
                                        {opcaoCarne ?
                                        
                                        <>
                                        <div className="form-group">
                                            <div>
                                                <div>
                                                    <label style={{marginRight:"5rem"}}>Valor da Parcela:</label>
                                                    <input type="text" onChange={handleChangeValor} value={valor} name="formValor" className=" input-lg" placeholder="Valor da parcela" />
                                                </div>                                                
                                                <div style={{marginTop:"1rem"}}>
                                                    <label style={{marginRight:"0.5rem"}}>Quantidade de Parcelas:</label>
                                                    <select name="qtdParcelas" onChange={handleChangeParcelas} value={qtdParcelas} className="input-lg">
                                                        {/* <option>1</option> */}
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                        <option>6</option>
                                                        <option>7</option>
                                                        <option>8</option>
                                                        <option>9</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option>12</option>
                                                    </select>   
                                                </div>

                                            </div>
                                        </div>
                                        </>:
                                        <div className="form-group">
                                            <input type="text" onChange={handleChangeValor} value={valor} name="formValor" className="form-control input-lg" placeholder="Quanto quer doar?" />
                                        </div>
                                        }                                      
                                        
                                         
                                        

                                        <div className="form-group">
                                            <div className="row" style={{display:"flex", justifyContent:"center"}}>
                                               <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                                   <label className={"btn btn-light " + (opcaoCartao ? "opcaoSelecionada" : '')} id="btnCartao">
                                                       <input type="radio" onChange={handleChangeOpcaoPagamento} name="opcaoPagamento" value="CARTAO" checked={opcaoCartao} />
                                                       <img src={cartao} className="iconeDoacao" alt="Doar via cartão de credito" />
                                                       <div>
                                                           <h5>Credito</h5>
                                                       </div>
                                                   </label>
                                                   <label className={"btn btn-light " + (opcaoBoleto ? "opcaoSelecionada" : '')}  id="btnBoleto">
                                                       <input type="radio" onChange={handleChangeOpcaoPagamento} name="opcaoPagamento" value="BOLETO" checked={opcaoBoleto} />
                                                       <img src={boleto} className="iconeDoacao" alt="Doar via Boleto" />
                                                       <div>
                                                           <h5>Boleto</h5>
                                                       </div>
                                                   </label>
                                                   <label className={"btn btn-light " + (opcaoCarne ? "opcaoSelecionada" : '')}  id="btnCarne">
                                                       <input type="radio" onChange={handleChangeOpcaoPagamento} name="opcaoPagamento" value="CARNE" checked={opcaoCarne} />
                                                       <img src={boleto} className="iconeDoacao" alt="Doar via Carnê" />
                                                       <div>
                                                           <h5>Carnê</h5>
                                                       </div>
                                                   </label>
                                                   <label className={"btn btn-light " + (opcaoPix ? "opcaoSelecionada" : '')}  id="btnPix">
                                                       <input type="radio" onChange={handleChangeOpcaoPagamento} name="opcaoPagamento" value="PIX" checked={opcaoPix} />
                                                       <img src={pix} className="iconeDoacao" alt="Doar via Pix" />
                                                       <div>
                                                           <h5>PIX</h5>
                                                       </div>
                                                   </label>
                                               </div>
                                            </div>                                     
                                        </div>

                                        {opcaoCartao ?
                                        <>
                                        <div className="form-group">
                                            
                                            <div className="col-md-6">
                                                <label title="Numero do cartão">Número do cartão</label>
                                                <input type="tel" onChange={changeNumeroCartao} onFocus={changeFocus} maxLength="19" value={numeroCartao} name='number' className="form-control input-lg" placeholder="Número do cartão" required />

                                                <label title="Nome do Titular">Nome do Titular</label>
                                                <input type="text" onChange={changeNomeCartao} onFocus={changeFocus} value={nomeCartao} name='name' className="form-control input-lg" placeholder="Nome do Titular" required />                                            

                                                <label title="Validade">Validade</label>
                                                <input type="text" onChange={changeValidade} onFocus={changeFocus} maxLength="5" value={validade} name='expiry' className="form-control input-lg" placeholder="MM/AAAA" required />

                                                <label title="CVC">CVC</label>
                                                <input type="tel" onChange={changeCVC} onFocus={changeFocus}  maxLength="3" value={cvc} name='cvc' className="form-control input-lg" placeholder="CVC" required />
                                            </div>

                                            <div className="col-md-6">
                                                <Cards 
                                                    name={nomeCartao}
                                                    number={numeroCartao}
                                                    expiry={validade}
                                                    cvc={cvc}
                                                    focused={focused}
                                                />
                                            </div>  
                                        </div>
                                        </> 
                                        : ''}

                                        {opcaoPix ?
                                        <>
                                        <div className="form-group">
                                            
                                            <div className="col-sm-8 col-md-12">

                                                <div className="col-md-6 QrCode">
                                                    <h1> Doe através da chave PIX </h1>
                                                    <span> {docCampanha && docCampanha.data.chavepix[0].text !== '' ? docCampanha.data.chavepix[0].text : '********-****-****-****-************'}</span>
                                                </div>
                                                <div className="col-md-6 QrCode">
                                                    <h1> Ou escaneie o código abaixo</h1>

                                                    {dataQrCode !== '' 

                                                    ?                                                         
                                                        <img src={dataQrCode} alt="QrCode" /> 
                                                    :

                                                    <>
                                                        <button type="submit" className={`btn btn-${dados.data.tipobotao[0].text} btn-lg`} onClick={()=>{}} >
                                                            Gerar QrCode
                                                        </button> 
                                                    </>
                                                    
                                                    }
                                                    
                                                </div>
                                                
                                            </div>  
                                        </div>    
                                        </>
                                        : ''}

                                    </div>

                                </div> 
                                <div className="row">

                                    {opcaoPix !== true ?
                                    <div className="form-group doacaoSalvarDados">

                                        <input type="checkbox" onChange={handleChangeSalvarDados} className="form-control-input" name="salvarDados" id="SALVAR" checked={salvarDados} value={salvarDados}/>
                                        <label htmlFor="SALVAR" className="form-check-label labelDoacao">Salvar meus dados</label>

                                    </div> 
                                    : <> </> }
                                    
                                    {jaDoou===true && opcaoPix === false
                                        ?
                                        <>
                                            <div className="col-sm-8">
                                                <div className={`alert alert-${dados.data.tipobotao[0].text}`}>Envio realizado!</div>
                                            </div>
                                            <div className="col-sm-8">
                                                <button type="submit" className={`btn btn-${dados.data.tipobotao[0].text} btn-lg`}>Realizar outra Doação</button>
                                            </div> 
                                        </>
                                        :
                                            <>
                                            {opcaoPix === true ? 
                                            <div/>
                                            :
                                            <div className="col-sm-8">
                                                <button type="submit" className={`btn btn-${dados.data.tipobotao[0].text} btn-lg`}>Realizar Doação</button>
                                            </div>  
                                            }                                                                               
                                            </>
                                    }
                                    
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div> }
            {/* </section>     */}
        </>
    );
}