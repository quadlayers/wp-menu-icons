import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Wordpress dependencies
 */

import { Modal as ModalComponent } from '@wordpress/components';
import { useRef, useEffect } from '@wordpress/element';
import Header from './header';
import Footer from './footer';
import Body from './body';

const Modal = ( {
	children,
	pluginPrefix,
	show,
	title,
	onClose,
	className,
	__experimentalHideHeader = true,
	premiumSelURL,
	premiumTitle,
	tabTitle,
	toolbar = false,
	toolbarSearchIn,
	onChangeToolbar,
	sidebarContent,
	sidebarPosition = 'right',
	footerContent,
} ) => {
	const ref = useRef();

	useEffect( () => {
		const currentRef = ref?.current;

		const handleMouseClick = ( e ) => {
			// Do nothing if modal is not open
			if ( ! show || ! currentRef ) {
				return;
			}
			//Close if click on backdrop
			if ( ref.current !== e.target ) {
				return;
			}

			onClose( e );
		};

		currentRef?.addEventListener( 'click', handleMouseClick );
		return () => {
			currentRef?.removeEventListener( 'click', handleMouseClick );
		};
	}, [ ref, show, onClose ] );

	if ( ! show ) {
		return null;
	}

	return (
		<ModalComponent
			ref={ ref }
			onRequestClose={ onClose }
			shouldCloseOnClickOutside={ false }
			className={ classnames(
				'wpmi__modal media-modal wp-core-ui upload-php',
				className
			) }
			__experimentalHideHeader={ __experimentalHideHeader }
		>
			<div id={ pluginPrefix + '_modal' }>
				<button
					type="button"
					className="media-modal-close close"
					onClick={ onClose }
				>
					<span className="media-modal-icon">
						<span className="screen-reader-text">
							{ __( 'Close media panel', 'wp-menu-icons' ) }
						</span>
					</span>
				</button>

				<div className="media-frame mode-select wp-core-ui hide-menu">
					<Header
						title={ title }
						tabTitle={ tabTitle }
						premiumSelURL={ premiumSelURL }
						premiumTitle={ premiumTitle }
					/>

					<Body
						toolbar={ toolbar }
						onChangeToolbar={ onChangeToolbar }
						toolbarSearchIn={ toolbarSearchIn }
						sidebarContent={ sidebarContent }
						sidebarPosition={ sidebarPosition }
					>
						{ children }
					</Body>

					<Footer>{ footerContent }</Footer>
				</div>
			</div>
		</ModalComponent>
	);
};

export default Modal;
