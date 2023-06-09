import { __ } from "@wordpress/i18n";

//TODO: mover a components
export function OptionLibrary (props) {
    const { label, onChange, checked } = props

    return <div className="option-library">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
        <span className="description">
            {__(
                label,
                "wp-menu-icons"
            )}
        </span>
    </div>
}
