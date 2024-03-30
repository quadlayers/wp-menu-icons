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
	// Create a new object to avoid mutating the original objects
	const mergedObject = {};

	// Merge keys from both initialObject and newObject
	const allKeys = new Set( [
		...Object.keys( initialObject ),
		...Object.keys( newObject ),
	] );

	allKeys.forEach( ( key ) => {
		if (
			initialObject.hasOwnProperty( key ) &&
			newObject.hasOwnProperty( key )
		) {
			// If both objects have the key and the value in the initialObject is an object, recursively merge
			if (
				isObject( initialObject[ key ] ) &&
				! Array.isArray( initialObject[ key ] )
			) {
				mergedObject[ key ] = deepMerge(
					initialObject[ key ],
					newObject[ key ]
				);
			} else {
				// If not an object, prefer the value from newObject
				mergedObject[ key ] = newObject[ key ];
			}
		} else if ( initialObject.hasOwnProperty( key ) ) {
			// If the key only exists in initialObject
			mergedObject[ key ] = initialObject[ key ];
		} else if ( newObject.hasOwnProperty( key ) ) {
			// If the key only exists in newObject
			mergedObject[ key ] = newObject[ key ];
		}
	} );

	return mergedObject;
}
