export default function Header( {
	title,
	premiumSelURL,
	premiumTitle,
	tabTitle,
} ) {
	return (
		<>
			<div className="media-frame-title">
				<h1>{ title }</h1>
			</div>

			<div className="media-frame-router">
				<div className="media-router">
					<a
						href={ premiumSelURL }
						className="media-menu-item"
						target="_blank"
						rel="noreferrer"
					>
						{ premiumTitle }
					</a>

					<a href="#" className="media-menu-item active">
						{ tabTitle }
					</a>
				</div>
			</div>
		</>
	);
}
