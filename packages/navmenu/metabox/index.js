import classNames from 'classnames';

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { Spinner } from '@wpmi/components';

import {
	useLibraries,
	useCurrentLibrary,
	useSettingsEntities,
} from '@wpmi/store';

// eslint-disable-next-line
const { WPMI_PREFIX } = wpmi_navmenu;

const menuEdit = document.querySelector( '.menu-edit' );

const inputMenuFont = document.createElement( 'input' );
inputMenuFont.type = 'hidden';
inputMenuFont.id = 'wpmi_font';
inputMenuFont.name = 'wpmi_font';

if ( menuEdit ) menuEdit.append( inputMenuFont );

export default function MetaBox() {
	const {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries,
	} = useLibraries();
	const { currentLibrary, currentLibraryName, setCurrentLibraryName } =
		useCurrentLibrary();

	const { settings, hasResolvedSettings } = useSettingsEntities();

	const handleOptionChange = ( e ) => setCurrentLibraryName( e.target.value );

	const activeLibraries = () =>
		libraries.filter( ( library ) =>
			settings.active_libraries.includes( library.name )
		);

	useEffect( () => {
		if ( currentLibrary ) inputMenuFont.value = currentLibraryName;
	}, [ currentLibraryName, currentLibrary ] );

	if (
		isResolvingLibraries &&
		! hasResolvedLibraries &&
		! hasResolvedSettings
	) {
		return <Spinner />;
	} else if ( ! hasLibraries ) {
		return (
			<div>
				{ __( 'There are no active libraries.', 'wp-menu-icons' ) };
			</div>
		);
	}

	return (
		<div
			id={ `tabs-panel-${ WPMI_PREFIX }-themes` }
			className="tabs-panel tabs-panel-active"
		>
			<ul
				id={ WPMI_PREFIX + '-themes-checklist' }
				className="categorychecklist form-no-clear"
			>
				{ activeLibraries().map(
					( { name, label, type, is_loaded: isLoaded } ) => {
						const isUploaded = type === 'uploaded';

						return (
							<li key={ name }>
								<label
									className={ classNames(
										'menu-item-title',
										isUploaded && 'wpmi__premium-badge'
									) }
								>
									<input
										type="radio"
										className={
											WPMI_PREFIX + '-item-checkbox'
										}
										name={ WPMI_PREFIX + '_font' }
										disabled={ ! isLoaded }
										value={ name }
										checked={ name === currentLibraryName }
										onChange={ handleOptionChange }
									/>
									{ label }
								</label>
							</li>
						);
					}
				) }
			</ul>
		</div>
	);
}
