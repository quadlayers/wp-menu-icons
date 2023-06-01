import classnames from "classnames";

/**
 * Wordpress dependencies
 */

import { Modal as ModalComponent } from "@wordpress/components";
import { useRef, useEffect } from "@wordpress/element";

const Modal = ({
	title,
	show,
	onClose,
	children,
	className,
	__experimentalHideHeader = false,
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
			title={title}
			onRequestClose={onClose}
			shouldCloseOnClickOutside={false}
			className={classnames(
				"wpmi__modal media-modal wp-core-ui upload-php",
				className
			)}
			__experimentalHideHeader={__experimentalHideHeader}
		>
			{children}
		</ModalComponent>
	);
};

export default Modal;
