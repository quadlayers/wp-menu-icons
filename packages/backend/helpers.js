import { reduce, isObject } from 'lodash';

/**
 * Wordpress Dependencies
 */
import wpApiFetch from '@wordpress/api-fetch';

const {
	WPMI_PLUGIN_NAME,
	WPMI_PLUGIN_VERSION,
	WPMI_PLUGIN_FILE,
	WPMI_PLUGIN_DIR,
	WPMI_DOMAIN,
	WPMI_PREFIX,
	WPMI_WORDPRESS_URL,
	WPMI_REVIEW_URL,
	WPMI_DEMO_URL,
	WPMI_PREMIUM_SELL_URL,
	WPMI_SUPPORT_URL,
	WPMI_DOCUMENTATION_URL,
	WPMI_GROUP_URL,
	WPMI_DEVELOPER,
	WPMI_SETTING_MODEL,
	plugin_url: pluginURL,
	// eslint-disable-next-line
} = wpmi_backend;

export {
	WPMI_PLUGIN_NAME,
	WPMI_PLUGIN_VERSION,
	WPMI_PLUGIN_FILE,
	WPMI_PLUGIN_DIR,
	WPMI_DOMAIN,
	WPMI_PREFIX,
	WPMI_WORDPRESS_URL,
	WPMI_REVIEW_URL,
	WPMI_DEMO_URL,
	WPMI_PREMIUM_SELL_URL,
	WPMI_SUPPORT_URL,
	WPMI_DOCUMENTATION_URL,
	WPMI_GROUP_URL,
	WPMI_DEVELOPER,
	WPMI_SETTING_MODEL,
};

/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch( args ) {
	return await wpApiFetch( args )
		.then( ( response ) => {
			if ( response.code ) {
				throw new Error(
					`${ response.code }: ${ response?.message || 'Unknown' }`
				);
			}
			return response;
		} )
		.catch( ( error ) => {
			throw new Error( error );
		} );
}

export function getPluginURL( url ) {
	return pluginURL + url;
}

export const onDocumentLoaded = ( cb ) => {
	if ( /comp|inter|loaded/.test( document.readyState ) ) {
		cb();
	} else {
		document.addEventListener( 'DOMContentLoaded', cb, false );
	}
};

export function deepMerge( initialObject, newObject ) {
	return reduce(
		initialObject,
		( acc, value, key ) => {
			if ( newObject.hasOwnProperty( key ) ) {
				if ( isObject( value ) ) {
					acc[ key ] = deepMerge( value, newObject[ key ] );
				} else {
					acc[ key ] = newObject[ key ];
				}
			} else {
				acc[ key ] = value;
			}
			return acc;
		},
		{}
	);
}
