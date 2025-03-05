import wpApiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { STORE_NAME } from './constants';
// eslint-disable-next-line
export const { WPMI_REST_ROUTES, WP_VERSION } = wpmi_store;

export const FIRST_WP_VERSION_WITH_THUNK_SUPPORT = '6.0';
/**
 * Handle the response from the apiFetch
 *
 * @param {*} args
 * @returns response or error
 */
export async function apiFetch( args ) {
	return await wpApiFetch( args )
		.then( ( response ) => {
			// if (response.code) {
			// 	throw new Error(
			// 		`${response.code}: ${response?.message || 'Unknown'}`
			// 	);
			// }
			return response;
		} )
		.catch( ( error ) => {
			throw new Error( error );
		} );
}

export const fetchRestApiLibraries = ( { method, data, headers } = {} ) => {
	return apiFetch( {
		path: WPMI_REST_ROUTES.libraries,
		method,
		data,
		headers,
	} );
};

export const fetchRestApiLibrariesUpload = ( {
	method,
	body,
	headers,
} = {} ) => {
	return apiFetch( {
		path: WPMI_REST_ROUTES.libraries_upload,
		method,
		body,
		headers,
	} );
};

export const fetchRestApiDeleteLibrary = ( libraryName ) => {
	return apiFetch( {
		path: WPMI_REST_ROUTES.libraries + `?library_name=${ libraryName }`,
		method: 'DELETE',
	} );
};

export const fetchRestApiSettings = ( { method, data } = {} ) => {
	return apiFetch( {
		path: WPMI_REST_ROUTES.settings,
		method,
		data,
	} );
};

export const fetchRestApiMenu = ( idMenu ) => {
	return apiFetch( {
		path: WPMI_REST_ROUTES.navmenu + '?id=' + idMenu,
	} );
};

const LinkStyleSheet = ( () => {
	const link = document.createElement( 'link' );
	link.rel = 'stylesheet';
	link.href = '';

	document.head.append( link );

	const setHref = ( url ) => {
		if ( ! url ) {
			return;
		}

		link.href = url;
	};

	return {
		setHref,
	};
} )();

export const getIcons = async ( library ) => {
	if ( ! library.is_loaded ) {
		return [];
	}

	if ( library.iconmap ) {
		return library.iconmap.split( ',' );
	}

	if ( library.json_file_url ) {
		const response = await fetch(
			new Request( library.json_file_url, { cache: 'no-store' } )
		);

		if ( ! response.ok ) {
			return [];
		}

		const data = await response.json();
		const { prefix } = library;

		if ( data.IcoMoonType ) {
			const icons = data.icons.map(
				( icon ) => prefix + icon.properties.name
			);

			return icons;
		}
		const icons = data.glyphs.map( ( item ) => prefix + item.css );

		return icons;
	}
	return [];
};

export const useCurrentLibraryIconMap = () => {
	const [ iconMap, setIconMap ] = useState( [] );
	const [ isLoadingIconMap, setIsLoadingIconMap ] = useState( false );

	const currentLibrary = useSelect( ( select ) => {
		const { getCurrentLibrary } = select( STORE_NAME );

		return getCurrentLibrary();
	}, [] );

	const filterIcons = ( search ) =>
		iconMap.filter( ( icon ) => icon.includes( search ) );

	useEffect( () => {
		if ( currentLibrary ) {
			setIsLoadingIconMap( true );

			getIcons( currentLibrary ).then( ( r ) => {
				setIconMap( r );
				setIsLoadingIconMap( false );
			} );
		} else {
			setIconMap( [] );
		}
	}, [ currentLibrary ] );

	return {
		iconMap,
		isLoadingIconMap,
		filterIcons,
	};
};

export const useLibraries = () => {
	const { libraries, isResolvingLibraries, hasResolvedLibraries } = useSelect(
		( select ) => {
			const { getLibraries, isResolving, hasFinishedResolution } =
				select( STORE_NAME );

			return {
				libraries: getLibraries(),
				isResolvingLibraries: isResolving( 'getLibraries' ),
				hasResolvedLibraries: hasFinishedResolution( 'getLibraries' ),
			};
		},
		[]
	);

	const { uploadLibrary, deleteLibrary } = useDispatch( STORE_NAME );

	return {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries: !! ( hasResolvedLibraries && libraries?.length ),
		uploadLibrary,
		deleteLibrary,
	};
};

export const useCurrentLibrary = () => {
	const {
		currentLibrary,
		currentLibraryName,
		isResolvingCurrentLibrary,
		hasResolvedCurrentLibrary,
	} = useSelect( ( select ) => {
		const {
			getCurrentLibraryName,
			getLibraries,
			isResolvingCurrentLibrary: isResolving,
			hasFinishedResolution,
		} = select( STORE_NAME );

		const idMenu = document.getElementById( 'menu' )?.value;

		const libraries = getLibraries();

		const currentLibraryNameLocal = getCurrentLibraryName( idMenu );

		const currentLibraryLocal = libraries.find(
			( library ) => library.name === currentLibraryNameLocal
		);

		if ( currentLibraryLocal?.is_loaded ) {
			// eslint-disable-next-line
			const { stylesheet_file_url: url = '' } = currentLibraryLocal;

			LinkStyleSheet.setHref( url );
		}

		return {
			currentLibrary: currentLibraryLocal,
			currentLibraryName: currentLibraryNameLocal,
			isResolvingCurrentLibrary: isResolving,
			hasResolvedCurrentLibraryName: hasFinishedResolution(
				'getCurrentLibraryName'
			),
		};
	}, [] );

	const { setCurrentLibraryName } = useDispatch( STORE_NAME );

	return {
		currentLibrary,
		currentLibraryName,
		setCurrentLibraryName,
		isResolvingCurrentLibrary,
		hasResolvedCurrentLibrary,
	};
};

export function useSettingsEntities() {
	const { saveSettings, setSettings } = useDispatch( STORE_NAME );

	const { settings, isResolvingSettings, hasResolvedSettings } = useSelect(
		( select ) => {
			const { isResolving, hasFinishedResolution, getSettings } =
				select( STORE_NAME );

			return {
				settings: getSettings(),
				isResolvingSettings: isResolving( 'getSettings' ),
				hasResolvedSettings: hasFinishedResolution( 'getSettings' ),
			};
		},
		[]
	);

	return {
		settings,
		isResolvingSettings,
		hasResolvedSettings,
		hasSettings: !! (
			hasResolvedSettings && Object.keys( settings )?.length
		),
		saveSettings,
		setSettings,
	};
}

export const isVersionLessThan = ( currentVersion, targetVersion ) => {
	const currentParts = currentVersion.split( '.' ).map( Number );
	const targetParts = targetVersion.split( '.' ).map( Number );

	for ( let i = 0; i < targetParts.length; i++ ) {
		if ( currentParts[ i ] < targetParts[ i ] ) {
			return true;
		}

		if ( currentParts[ i ] > targetParts[ i ] ) {
			return false;
		}
	}

	return false;
};

const createThunkArgs = ( instance, registry ) => {
	const thunkArgs = {
		registry,
		get dispatch() {
			return Object.assign(
				( action ) => instance.store.dispatch( action ),
				instance.getActions()
			);
		},
		get select() {
			return Object.assign(
				( selector ) =>
					selector( instance.store.__unstableOriginalGetState() ),
				instance.getSelectors()
			);
		},
		get resolveSelect() {
			return instance.getResolveSelectors();
		},
	};

	return thunkArgs;
};

const createThunkMiddleware = ( thunkArgs, next ) => ( action ) => {
	if ( typeof action === 'function' ) {
		return action( thunkArgs );
	}

	return next( action );
};

export const applyThunkMiddleware = ( store ) => {
	const originalInstantiate = store.instantiate;

	store.instantiate = ( registry ) => {
		const instance = originalInstantiate( registry );

		if ( ! instance.store || ! instance.store.dispatch ) {
			throw new Error(
				__(
					'The created instance does not contain a valid store.',
					'wp-menu-icons'
				)
			);
		}

		const dispatch = instance.store.dispatch;
		const thunkArgs = createThunkArgs( instance, registry );

		instance.store.dispatch = createThunkMiddleware( thunkArgs, dispatch );

		return instance;
	};

	return store;
};
