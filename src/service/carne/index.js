import {requestApi} from '../../service/apiGeneric'

async function apiCarne(dados, dadosCampanha){
    var path = "/carne"

    var obj = {
            nome: dados.nome,
            cpf: dados.cpf,
            telefone: dados.telefone,
            campanha: {
                nome: dadosCampanha.nome,
                descricao: dadosCampanha.descricao,
                valor: parseInt(dadosCampanha.valor, 10),
            },
            qtdParcelas: parseInt(dadosCampanha.qtdParcelas, 10)
        }
    var response = await requestApi(path, obj)
    return response
}

export default apiCarne
