const BASE_URL = 'https://components1808.firebaseio.com/menu/-Kvhzifyb_lsuVgKsNIc.json';

/**
 * Data source for links collection
 */
export class Service {
    /**
     * Wrapper for XMLHttpRequest
     * @param {string} method
     * @param {string} url
     * @param {Object} data
     * @return {Promise<*>}
     */
    static _makeRequest(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            xhr.onload = () => {
                resolve(JSON.parse(xhr.responseText));
            };

            if (typeof data !== 'undefined') {
                data = JSON.stringify(data);
            }

            xhr.send(data);
        });
    }

    /**
     * Get collection
     * @return {Promise<*>}
     */
    static getItems() {
        return this._makeRequest('GET', BASE_URL, undefined);
    }

    /**
     * Update collections
     * @param {Object} links
     * @return {Promise<*>}
     */
    static putItems(links) {
        return this._makeRequest('PUT', BASE_URL, links);
    }
}
