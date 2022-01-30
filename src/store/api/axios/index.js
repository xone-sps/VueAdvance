import client from 'axios';
///Clean token


const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
/**
* The following rules are copy/pasted from Node core library
* at the time this comment was made October 18, 2019, the following function
* is the latest version from https://github.com/nodejs/node/blob/master/lib/_http_common.js
    */

/**
* True if val contains an invalid field-vchar
*  field-value    = *( field-content / obs-fold )
*  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
*  field-vchar    = VCHAR / obs-text
    */
    function checkInvalidHeaderChar(val) {
        return headerCharRegex.test(val);
    }

// Same logic as checkInvalidHeaderChar, which removes all invalid chars
function cleanHeaderValue(val) {
    const nVal = String(val);
    return nVal.replace(new RegExp(headerCharRegex, 'g'), '');
}

function getToken(tn) {
    if (checkInvalidHeaderChar(tn)) {
        return cleanHeaderValue(tn);
    }
    return tn;
}
const apiUrl = process.env['VUE_APP_BASE_API_URL'];
const config = {
    addHeader(k, v) {
        this.headers[k] = v;
        return this.getHeaders();
    },
    getHeaders() {
        return { headers: this.headers };
    },
    addTokenHeader(token, isMultipart = false) {
        if (isMultipart) {
            this.addHeader('Content-Type', 'multipart/form-data');
        } else {
            this.addHeader('Content-Type', 'application/json');
        }
        this.addHeader('Authorization', `Bearer ${getToken(token)}`);
        return this.getHeaders();
    },
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

    export {
        apiUrl,
        config,
        client,
    }
