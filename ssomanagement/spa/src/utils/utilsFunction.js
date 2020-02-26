import axios from 'axios';

export const getCSRFToken = function(){
    let axiosConfig = {
        headers : {},
        data:{},
    };

    axiosConfig.headers['Accept'] = 'application/json';
    axiosConfig.headers['Content-Type'] = 'application/json';

    return axios.get('api/csrf-token', axiosConfig)
        .then(function (response) {
            console.log(response);
            axiosConfig.headers[response.data.csrf_header] = response.data.csrf_token;
            return axiosConfig;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });
};