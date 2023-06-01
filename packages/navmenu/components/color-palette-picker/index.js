import { ColorPalette } from "@wordpress/components";

import {
	ColorPaletteControl /* ColorPalette */,
} from "@wordpress/block-editor";

export default function ColorPalettePicker(props) {
	const { label } = props;

	return (
		<div
			className="ql-color-palette-picker"
			onClick={(e) => {
				//Fix custom color click poppover redirect
				e.preventDefault();
			}}
		>
			<ColorPaletteControl {...props} showTitle={!!label} />
		</div>
	);
}
