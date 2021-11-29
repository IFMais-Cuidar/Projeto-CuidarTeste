import axios from "axios";


async function requestApi(url, obj) {
    const REST_API_URL = process.env.REACT_APP_REST_API_URL; //'http://localhost:8080/api'
        const config = {
            method: 'POST',
            url: REST_API_URL + url,
            headers: {
                Authorization: 'Basic',
                'Content-type': 'application/json',
            },
            data: obj
        }
        var response = await axios(config)

    return response
}

async function getSalt() {
    const REST_API_URL = process.env.REACT_APP_REST_API_URL; //'http://localhost:8080/api'
    const config = {
        method: 'GET',
        url: REST_API_URL +"/salt",
        headers: {
            Authorization: 'Basic',
        },
    }
    var response = await axios(config)
    return response.data
}
async function getRsa() {
    const REST_API_URL = process.env.REACT_APP_REST_API_URL; //'http://localhost:8080/api'
    const config = {
        method: 'GET',
        url: REST_API_URL +"/rsa",
        headers: {
            Authorization: 'Basic',
        },
    }
    var response = await axios(config)
    return response.data
}


export {requestApi, getSalt, getRsa}