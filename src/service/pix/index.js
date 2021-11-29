import {requestApi} from '../../service/apiGeneric'

async function apiPix(valorPix){
    var path = "/pix"

    var obj = {
        valor : valorPix
    }
    var response = await requestApi(path, obj)
    return response
}

export default apiPix
