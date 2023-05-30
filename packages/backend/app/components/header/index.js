/**
 * WordPress dependencies
 */

import { __, sprintf } from "@wordpress/i18n";

/**
 * Internal dependencies
 */

import {
	QLWPMI_PRO_PLUGIN_NAME,
	QLWPMI_PRO_PREMIUM_SELL_URL,
	QLWPMI_PRO_DEMO_URL,
	QLWPMI_PRO_DOCUMENTATION_URL,
	getPluginURL,
} from "../../../helpers";

const Header = () => {
	return (
		<>
			<div className="wrap about-wrap full-width-layout">
				<h1>{QLWPMI_PRO_PLUGIN_NAME}</h1>
				<p className="about-text">
					{sprintf(
						__(
							"Thanks for using %s! We will do our best to offer you the best and improved communication experience with your users."
						),
						QLWPMI_PRO_PLUGIN_NAME
					)}
				</p>
				<p className="about-text">
					<a href={QLWPMI_PRO_PREMIUM_SELL_URL} target="__blank">
						{__("Premium", "insta-gallery")}
					</a>{" "}
					|
					<a href={QLWPMI_PRO_DEMO_URL} target="__blank">
						{__("Demo", "insta-gallery")}
					</a>{" "}
					|
					<a href={QLWPMI_PRO_DOCUMENTATION_URL} target="__blank">
						{__("Documentation", "insta-gallery")}
					</a>{" "}
					|
					<a
						href="https://quadlayers.com/documentation/instagram-feed-gallery/api/business/?utm_source=qligg_admin"
						target="__blank"
					>
						{__("Business", "insta-gallery")}
					</a>
				</p>
				<a
					href="https://quadlayers.com/?utm_source=qligg_admin"
					target="_blank"
					rel="noreferrer"
				>
					<div
						style={{
							backgroundImage: `url(${getPluginURL(
								"/assets/backend/img/quadlayers.jpg"
							)})`,
						}}
						className="wp-badge quadlayers__logo"
					>
						QuadLayers
					</div>
				</a>
			</div>
		</>
	);
};

export default Header;
