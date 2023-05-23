import { ColorPicker } from '@wordpress/components';

const {
    WPMI_PREFIX
} = wpmi_backend

export default function IconSettings({ settings, setSettings }) {
    const changeSetting = e => {
        const { name, value } = e.target

        const newSettings = {
            ...settings,
            [name]: value
        }

        setSettings(newSettings)
    }

    const setColor = value => setSettings({ ...settings, color: value.hex })

    return <div class="attachment-info">
        <form>
            <label class="setting">
                <span>Hide Label</span>

                <select
                    id={ WPMI_PREFIX + '-input-label' }
                    class={ WPMI_PREFIX + '-input'}
                    name="label"
                    onChange={changeSetting}
                    value={ settings.label }
                >
                    <option value="">No</option>
                    <option value="1">Yes</option>
                </select>
            </label>

            <label class="setting">
                <span>Position</span>

                <select
                    id={ WPMI_PREFIX + '-input-position' }
                    class={ WPMI_PREFIX + '-input' }
                    name="position"
                    onChange={changeSetting}
                    value={ settings.position }
                >
                    <option value="before">Before</option>
                    <option value="after">After</option>
                </select>
            </label>

            <label class="setting">
                <span>Vertical Align</span>

                <select
                    id={ WPMI_PREFIX + '-input-align' }
                    class={ WPMI_PREFIX + '-input' }
                    name="align"
                    onChange={changeSetting}
                    value={ settings.align }
                >
                    <option value="top">Top</option>
                    <option value="middle">Middle</option>
                    <option value="bottom">Bottom</option>
                </select>
            </label>

            <label class="setting">
                <span>Size <em>(em)</em></span>

                <input
                    id={ WPMI_PREFIX + '-input-size' }
                    class={ WPMI_PREFIX + '-input' }
                    name="size"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={ settings.size }
                    onChange={changeSetting}
                />
            </label>
            
            <label class="wpmi-color-picker">
                <span class="container">
                    <ColorPicker
                        value={ settings.color }
                        onChangeComplete={ setColor }
                    />
                </span>
            </label>
        </form>
    </div>
}