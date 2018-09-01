import fetch from 'isomorphic-fetch';
// TODO: Try axios

export const INITIALIZE_REQUEST = 'INITIALIZE_REQUEST';
export const INITIALIZE_RECEIVED = 'INITIALIZE_RECEIVED';

export function initialize() {
    return (dispatch) => {
        return dispatch(_initialize());
    };
}

function _initializeReceived(username, csrf, version) {
   return {
      type: INITIALIZE_RECEIVED,
      username: username,
      csrf: csrf,
      version: version
   };
}

function _initializeRequest() {
   return {
      type: INITIALIZE_REQUEST,
   };
}

function _initialize() {
    return (dispatch) => {
        dispatch(_initializeRequest());
        let p1 = fetch('/id', {
            credentials: 'same-origin'
        });
        p1.then(response => response.json())
        .then(json => {
            let csrf = json._csrf;
            let username = json.username;
            let version = json.version;
            return dispatch(_initializeReceived(username, csrf, version));
        });
    };
}
