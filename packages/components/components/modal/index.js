import { __ } from '@wordpress/i18n';
import classnames from "classnames";

/**
 * Wordpress dependencies
 */

import { Modal as ModalComponent } from "@wordpress/components";
import { useRef, useEffect } from "@wordpress/element";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";

const Modal = ({
	children,
	pluginPrefix,
	show,
	title,
	onClose,
	className,
	__experimentalHideHeader = false,
	premiumSelURL,
	premiumTitle,
	tabTitle,
	toolbar = false,
	toolbarSearchIn,
	onChangeToolbar,
	sidebarContent,
	footerContent
}) => {
	const ref = useRef();	

	useEffect(() => {
		const handleMouseClick = (e) => {
			// Do nothing if modal is not open
			if (!show || !ref?.current) {
				return;
			}
			//Close if click on backdrop
			if (ref.current !== e.target) {
				return;
			}

			onClose(e);
		};

		ref?.current?.addEventListener("click", handleMouseClick);
		return () => {
			ref?.current?.removeEventListener("click", handleMouseClick);
		};
	}, [ref, show]);

	if (!show) {
		return null;
	}

	return (
		<ModalComponent
			ref={ref}
			onRequestClose={onClose}
			shouldCloseOnClickOutside={false}
			className={classnames(
				"__modal media-modal wp-core-ui upload-php",
				className
			)}
			__experimentalHideHeader={__experimentalHideHeader}
		>
			<div id={pluginPrefix + '_modal'}>
				<button
					type="button"
					class="media-modal-close close"
					onClick={onClose}
				>
					<span class="media-modal-icon">
						<span class="screen-reader-text">
							{__('Close media panel', 'wp-menu-icons')}
						</span>
					</span>
				</button>

				<div class="media-frame mode-select wp-core-ui hide-menu">
					<Header
						title={title}
						tabTitle={tabTitle}
						premiumSelURL={premiumSelURL}
						premiumTitle={premiumTitle}
					/>

					<Body
						toolbar={toolbar}
						onChangeToolbar={onChangeToolbar}
						toolbarSearchIn={toolbarSearchIn}
						sidebarContent={sidebarContent}
					>
						{ children }
					</Body>
					
					<Footer>
						{ footerContent }
					</Footer>
				</div>
			</div>
		</ModalComponent>
	);
};

export default Modal;
