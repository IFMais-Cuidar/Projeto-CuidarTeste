import {requestApi} from '../../service/apiGeneric'

async function apiBoleto(dados, dadosCampanha){
    var path = "/boleto"

    var obj = {
            nome: dados.nome,
            cpf: dados.cpf,
            telefone: dados.telefone,
            campanha: {
                nome: dadosCampanha.nome,
                descricao: dadosCampanha.descricao,
                valor: parseInt(dadosCampanha.valor, 10),
            }
        }
    var response = await requestApi(path, obj)
    return response
}

export default apiBoleto