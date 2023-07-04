export default function IconPreview( { icon, settings } ) {
	return (
		<div className="wpmi__icon-preview attachment-info">
			<div className="thumbnail thumbnail-image">
				<i className={ icon }></i>
			</div>

			<div className="details">
				<div className="filename">{ icon }</div>
				<div className="uploaded">{ settings.align }</div>
				<div className="file-size">
					{ settings.size } <em>(em)</em>
				</div>
			</div>
		</div>
	);
}
