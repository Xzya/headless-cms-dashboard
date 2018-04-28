import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest'

import {
    ITEM_TYPES,
    FIELDS,
    ITEMS
} from "./resources"

// TODO: - remove this
const URL = "http://localhost:3000/api/projects/1"

const client = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

/**
 * Adds the `type` to the params based on the resource and the request type.
 * E.g. it will add `item_type` to `data.type` for the CREATE operation of
 * an `item-type` object.
 * 
 * @param {*} type 
 * @param {*} resource 
 * @param {*} params 
 */
const addResourceType = (type, resource, params) => {
    switch (type) {
        // only CREATE and UPDATE contains the `data` parameter which needs a `type`
        case CREATE:
        case UPDATE:
            if (typeof params.data === "object" && !Array.isArray(params.data)) {
                switch (resource) {
                    case ITEM_TYPES: {
                        params.data.type = "item_type";
                        break;
                    }
                    case FIELDS: {
                        params.data.type = "field";
                        if (params.data.relationships && params.data.relationships.itemType && params.data.relationships.itemType.data) {
                            params.data.relationships.itemType.data.type = "item_type";
                        }
                        break;
                    }
                    case ITEMS: {
                        params.data.type = "item";
                        break;
                    }
                    default: {
                        // ignore
                        break;
                    }
                }
            }
            break;
        default: {
            // ignore
            break;
        }
    }
    return (type, resource, params)
}

const urlForType = (apiUrl, type, resource, params) => {
    switch (type) {
        case GET_MANY:
        case GET_MANY_REFERENCE:
        case GET_LIST: {
            return `${apiUrl}/${resource}?${stringify(params)}`;
        }
        case GET_ONE:
            return `${apiUrl}/${resource}/${params.id}`;
        case UPDATE:
            return `${apiUrl}/${resource}/${params.id}`;
        case CREATE:
            if (typeof params.data === "object" && !Array.isArray(params.data)) {
                switch (resource) {
                    case FIELDS: {
                        return `${apiUrl}/item-types/${params.data.relationships.itemType.data.id}/fields`;
                    }
                }
            }
            return `${apiUrl}/${resource}`;
        case DELETE:
            return `${apiUrl}/${resource}/${params.id}`;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    return `${apiUrl}/${resource}`;
}

/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
const apiClientFactory = (apiUrl, httpClient = client) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        const options = {};
        type, resource, params = addResourceType(type, resource, params)
        let url = urlForType(apiUrl, type, resource, params);
        switch (type) {
            case GET_MANY:
            case GET_MANY_REFERENCE:
            case GET_LIST: {
                break;
            }
            case GET_ONE:
                break;
            case UPDATE:
                options.method = 'PUT';
                options.body = JSON.stringify(params);
                break;
            case CREATE:
                options.method = 'POST';
                options.body = JSON.stringify(params);
                break;
            case DELETE:
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
            case GET_LIST:
                return {
                    data: json.data,
                    total: json.data.length,
                };
            default:
                return json;
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponseToREST(response, type, resource, params)
        ).catch((error) => {
            if (error.body && error.body.error) {
                throw new Error(error.body.error);
            }
            throw error;
        });
    };
};

export default apiClientFactory(URL);