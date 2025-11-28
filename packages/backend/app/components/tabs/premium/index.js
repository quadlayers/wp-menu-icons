/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Header from '../../header';
import Nav from '../../nav';
import { useAppSlotContext } from '../../../structure/provider';
import { getPluginURL } from '../../../../helpers';
import { Button } from '../../../../components/button';

const Premium = () => {
	const { Fill } = useAppSlotContext();

	return (
		<>
			<Fill.Header>
				<Header />
			</Fill.Header>
			<Fill.Navigation>
				<Nav />
			</Fill.Navigation>
			<Fill.Content>
				<div className="wrap about-wrap full-width-layout">
					<div className="has-1-columns is-wider-left">
						<div className="column">
							<div className="welcome-header">
								<h1>{ __( 'Premium', 'wp-menu-icons' ) }</h1>
								<div className="about-description">
									{ __(
										'Unlock the capabilities of WP Menu Icons PRO, which allows you to upload your own custom icon libraries.',
										'wp-menu-icons'
									) }
								</div>
								<br />
								<Button
									href="https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=admin_tab&utm_campaign=premium_upgrade&utm_content=purchase_button"
									target="_blank"
								>
									{ __( 'Purchase Now', 'wp-menu-icons' ) }
								</Button>
								<Button
									isSecondary
									href="https://quadlayers.com/demo/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=admin_tab&utm_campaign=demo&utm_content=demo_button"
									target="_blank"
								>
									{ __( 'View demo', 'wp-menu-icons' ) }
								</Button>
							</div>
							<hr />
						</div>
					</div>
					<div className="has-2-columns is-wider-left">
						<div className="column">
							<div className="welcome-header">
								<h3>{ __( 'IcoMoon', 'wp-menu-icons' ) }</h3>
								<div className="about-description">
									<p>
										{ __(
											'The premium version allows you to seamlessly integrates with the IcoMoon app, enabling you to upload their custom icon sets directly in to your site.',
											'wp-menu-icons'
										) }
									</p>
									<p>
										{ __(
											'IcoMoon is a versatile icon management tool that provides a collection of vector icons and a platform to generate custom icon fonts or SVG sprites. It allows users to choose from thousands of free icons or import their own designs, and then convert them into scalable vector graphics or icon fonts.',
											'wp-menu-icons'
										) }
									</p>
									<p>
										{ __(
											"IcoMoon's icon fonts are resolution-independent, ensuring sharp display on high-resolution screens, and offer the advantage of being smaller in file size compared to traditional image files. The tool is highly appreciated by web designers and developers for its user-friendly interface, customization options, and for improving the efficiency of their design workflow.",
											'wp-menu-icons'
										) }
									</p>
								</div>
							</div>
						</div>
						<div className="column">
							<img
								alt="IcoMoon"
								src={ getPluginURL(
									'/assets/backend/img/wp-menu-icons-upload.png'
								) }
							/>
						</div>
					</div>
					<div className="has-2-columns is-wider-left">
						<div className="column">
							<br />
							<div className="welcome-header">
								<h3>{ __( 'Fontello', 'wp-menu-icons' ) }</h3>
								<div className="about-description">
									<p>
										{ __(
											'The premium version also allows you to upload Fontello fonts, enabling you to upload their custom icon sets directly in to your site.',
											'wp-menu-icons'
										) }
									</p>
									<p>
										{ __(
											'Fontello is a free online tool that allows you to combine icons from different sets, convert them into web fonts or vector graphics, and customize them to suit their needs.',
											'wp-menu-icons'
										) }
									</p>
									<p>
										{ __(
											'It offers a wide range of icons from various collections, including Font Awesome, Entypo, and Typicons, among others. Users can select the icons they need, adjust their sizes, and download them in various formats such as SVG, EOT, TTF, WOFF, or as a CSS file. Fontello is particularly useful for web developers and designers as it simplifies the process of using vector images in web design, making it easier to create responsive and visually appealing websites.',
											'wp-menu-icons'
										) }
									</p>
								</div>
							</div>
						</div>
						<div className="column">
							<img
								alt="Fontello"
								src={ getPluginURL(
									'/assets/backend/img/wp-menu-icons-fontello.png'
								) }
							/>
						</div>
					</div>
				</div>
			</Fill.Content>
		</>
	);
};

export default Premium;
