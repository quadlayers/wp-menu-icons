import { __ } from "@wordpress/i18n";

export function OptionLibrary ({ label, onChange, checked, disabled }) {
    return <div className={`wpmi__option-library ${disabled && 'wpmi__option-library--disabled'}`}>
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
