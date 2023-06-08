import { __ } from "@wordpress/i18n";

export function OptionLibrary ({ label, onChange, checked, disabled }) {
    return <div className={"option-library " + (disabled && 'disabled')}>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
        <span className="description">
            {__(
                label,
                "wp-menu-icons"
            )}
        </span>
    </div>
}
