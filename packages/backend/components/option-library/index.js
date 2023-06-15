import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

export function OptionLibrary({ label, onChange, checked, disabled, type }) {
	const isUploaded = type === 'uploaded';

	return (
		<div
			className={classnames(
				'wpmi__option-library',
				disabled && 'wpmi__option-library--disabled',
				isUploaded && 'wpmi__premium-badge'
			)}
		>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<span className="description">{label}</span>
			{isUploaded && (
				<i className="dashicons dashicons-upload wpmi__premium-hide" />
			)}
		</div>
	);
}
