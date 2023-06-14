import { __ } from '@wordpress/i18n';

export default function Header({
	title,
	premiumSelURL,
	premiumTitle,
	tabTitle,
}) {
	return (
		<>
			<div class="media-frame-title">
				<h1>{title}</h1>
			</div>

			<div class="media-frame-router">
				<div class="media-router">
					<a
						href={premiumSelURL}
						class="media-menu-item"
						target="_blank"
					>
						{premiumTitle}
					</a>

					<a href="#" class="media-menu-item active">
						{tabTitle}
					</a>
				</div>
			</div>
		</>
	);
}
