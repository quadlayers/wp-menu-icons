import { reduce, isObject } from 'lodash';

/**
 * Wordpress Dependencies
 */
import wpApiFetch from '@wordpress/api-fetch';

export const WPMI_PLUGIN_NAME = qlwpmi_backend.WPMI_PLUGIN_NAME;
export const WPMI_PLUGIN_VERSION = qlwpmi_backend.WPMI_PLUGIN_VERSION;
export const WPMI_PLUGIN_FILE = qlwpmi_backend.WPMI_PLUGIN_FILE;
export const WPMI_PLUGIN_DIR = qlwpmi_backend.WPMI_PLUGIN_DIR;
export const WPMI_DOMAIN = qlwpmi_backend.WPMI_DOMAIN;
export const WPMI_PREFIX = qlwpmi_backend.WPMI_PREFIX;
export const WPMI_WORDPRESS_URL = qlwpmi_backend.WPMI_WORDPRESS_URL;
export const WPMI_REVIEW_URL = qlwpmi_backend.WPMI_REVIEW_URL;
export const WPMI_DEMO_URL = qlwpmi_backend.WPMI_DEMO_URL;
export const WPMI_PREMIUM_SELL_URL = qlwpmi_backend.WPMI_PREMIUM_SELL_URL;
export const WPMI_SUPPORT_URL = qlwpmi_backend.WPMI_SUPPORT_URL;
export const WPMI_DOCUMENTATION_URL = qlwpmi_backend.WPMI_DOCUMENTATION_URL;
export const WPMI_GROUP_URL = qlwpmi_backend.WPMI_GROUP_URL;
export const WPMI_DEVELOPER = qlwpmi_backend.WPMI_DEVELOPER;
export const WPMI_SETTING_MODEL = qlwpmi_backend.WPMI_SETTING_MODEL;

/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch(args) {
	return await wpApiFetch(args)
		.then((response) => {
			if (response.code) {
				throw new Error(
					`${response.code}: ${response?.message || 'Unknown'}`
				);
			}
			return response;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export function getPluginURL(url) {
	return qlwpmi_backend.plugin_url + url;
}

export const onDocumentLoaded = (cb) => {
	if (/comp|inter|loaded/.test(document.readyState)) {
		cb();
	} else {
		document.addEventListener('DOMContentLoaded', cb, false);
	}
};

export function deepMerge(initialObject, newObject) {
	return reduce(
		initialObject,
		(acc, value, key) => {
			if (newObject.hasOwnProperty(key)) {
				if (isObject(value)) {
					acc[key] = deepMerge(value, newObject[key]);
				} else {
					acc[key] = newObject[key];
				}
			} else {
				acc[key] = value;
			}
			return acc;
		},
		{}
	);
}
