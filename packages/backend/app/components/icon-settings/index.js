import { ColorPicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const { WPMI_PREFIX } = wpmi_backend;

export default function IconSettings({ settings, setSettings }) {
	const handleSettingsChange = (e) => {
		const { name, value } = e.target;

		const newSettings = {
			...settings,
			[name]: value,
		};

		setSettings(newSettings);
	};

	const setColor = (value) => setSettings({ ...settings, color: value.hex });

	return (
		<div class="attachment-info">
			<form>
				<label class="setting">
					<span>{__('Hide Label', 'wp-menu-icons')}</span>

					<select
						id={ WPMI_PREFIX + '-input-label' }
						class={ WPMI_PREFIX + '-input' }
						name="label"
						onChange={ handleSettingsChange }
						value={ settings.label }
					>
						<option value="">{__('No', 'wp-menu-icons')}</option>
						<option value="1">{__('Yes', 'wp-menu-icons')}</option>
					</select>
				</label>

				<label class="setting">
					<span>{__('Position', 'wp-menu-icons')}</span>

					<select
						id={WPMI_PREFIX + '-input-position'}
						class={WPMI_PREFIX + '-input'}
						name="position"
						onChange={ handleSettingsChange }
						value={ settings.position }
					>
						<option value="before">
							{__('Before', 'wp-menu-icons')}
						</option>
						<option value="after">
							{__('After', 'wp-menu-icons')}
						</option>
					</select>
				</label>

				<label class="setting">
					<span>{__('Vertical Align', 'wp-menu-icons')}</span>

					<select
						id={WPMI_PREFIX + '-input-align'}
						class={WPMI_PREFIX + '-input'}
						name="align"
						onChange={ handleSettingsChange }
						value={ settings.align }
					>
						<option value="top">Top</option>
						<option value="middle">Middle</option>
						<option value="bottom">Bottom</option>
					</select>
				</label>

				<label class="setting">
					<span>
						{__('Size', 'wp-menu-icons')} <em>(em)</em>
					</span>

					<input
						id={WPMI_PREFIX + '-input-size'}
						class={WPMI_PREFIX + '-input'}
						name="size"
						type="number"
						min="0.1"
						step="0.1"
						onChange={ handleSettingsChange }
						value={ settings.size }
					/>
				</label>

				<ColorPicker
					value={ settings.color }
					onChangeComplete={ setColor }
				/>

				<label class="wpmi-color-picker">
					<span class="container"></span>
				</label>
			</form>
		</div>
	);
}
