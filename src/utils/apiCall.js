import config from '../config';

function apiCall(method, apiPath) {
    // POST - /createbucker/{bucketName}
    // GET - /{bucketName}/getdetails/
    // GET - /get/{bucketName}/{id}
    let url = `${config.api}/${apiPath}`;

    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'text/html'
        }
    })
        .then(function (response) {
            return response.json();
        })
}

export default apiCall;
