import { Spinner } from '../';
import { useLibraries, useCurrentLibrary } from '../../../store/helpers';
import { __ } from '@wordpress/i18n';

const { WPMI_PREFIX } = wpmi_backend;

export default function MetaBox() {
	const {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries,
	} = useLibraries();
	const { currentLibraryName, setCurrentLibraryName } = useCurrentLibrary();

	const handleOptionChange = (e) => setCurrentLibraryName(e.target.value);

	if (isResolvingLibraries && !hasResolvedLibraries) {
		return <Spinner />;
	} else if (!hasLibraries) {
		return (
			<div>{__('There are no active libraries.', 'wp-menu-icons')};</div>
		);
	}

	return (
		<div
			id={`tabs-panel-${WPMI_PREFIX}-themes`}
			class="tabs-panel tabs-panel-active"
		>
			<ul
				id={WPMI_PREFIX + '-themes-checklist'}
				class="categorychecklist form-no-clear"
			>
				{libraries.map((library) => (
					<li>
						<label class="menu-item-title">
							<input
								type="radio"
								class={WPMI_PREFIX + '-item-checkbox'}
								name={WPMI_PREFIX + '_font'}
								value={library.name}
								checked={library.name === currentLibraryName}
								onChange={handleOptionChange}
							/>
							{library.label}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}
