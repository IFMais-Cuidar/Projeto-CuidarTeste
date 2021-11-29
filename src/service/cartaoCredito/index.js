import {requestApi, getSalt, getRsa} from '../../service/apiGeneric'
import JSEncrypt from 'node-jsencrypt'

const getCardDataEncrypted = (saltTokenizer, publicKey, cardData) => {
    return new Promise(async (resolve, reject) => {

        cardData.salt = saltTokenizer;
        let crypt = await new JSEncrypt();
        try {
            await crypt.setPublicKey(publicKey);
            var encryptedCardData = await crypt.encrypt(JSON.stringify(cardData));
            resolve(encryptedCardData);
        } catch (e) {
            reject(e);
        }
    });
}


async function apiCartao(dados, cartao){

    var path = "/cartao"
    
    // pegando a chave criptografada do id da conta
    var salt = await getSalt()
    // console.log(salt)
    
    // pegando a chave publica
    var rsa = await getRsa()
    // console.log(rsa)
    
    // inserindo a chave salt dentro do objeto do cartao de credito
    var cartaoFull = {
        brand: cartao.bandeira,
        number: cartao.numeroCartao,
        cvv: cartao.cvc,
        expiration_month: cartao.expiracaoMes,
        expiration_year: cartao.expiracaoAno,
        salt: salt,
    }
    var response = null
    // encriptografando os dados do cartao de credito com o salt dentro,
    // atraves da chave publcia gerada.
    await getCardDataEncrypted(salt,rsa,cartaoFull).then(async result => {
        // console.log(result)
        // criando um objeto com a key encrypt, contendo os dados do cartao criptografado
        var encrypt = {encrypt:result}
        // adicionando o objeto encrypt dentro dos dados do doador
        // para que seja obtido o paymentToken 
        dados.paymentToken = encrypt
        // console.log(dados)
        // fazendo a requisicao do cartao de credito, passando todos os dados
        response = await requestApi(path, dados)    
        // return response
    }).catch(erro=>{
        console.log(erro)
    })

    return response
}

export default apiCartao