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
import { WPMI_PURCHASE_URL, WPMI_DEMO_URL } from '../../../../helpers';
import { getPluginURL } from '../../../../helpers';
import Button from '../../../../components/button';

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
					<div className="has-2-columns is-wider-left">
						<div className="column">
							<div className="welcome-header">
								<h1>{__('Premium', 'wp-menu-icons')}</h1>
								<div className="about-description">
									{__(
										'Unlock the power of our premium Wordpress menu icons Feed plugin which allows you to choose between six beautiful layouts and tone of customizing options.',
										'wp-menu-icons'
									)}
								</div>
								<br />
								<Button
									href={WPMI_PURCHASE_URL}
									target="_blank"
								>
									{__('Purchase Now', 'wp-menu-icons')}
								</Button>
								<Button
									isSecondary
									href={WPMI_DEMO_URL}
									target="_blank"
								>
									{__('View demo', 'wp-menu-icons')}
								</Button>
							</div>
							<hr />
							<div className="feature-section">
								<h3>
									{__('Download videos', 'wp-menu-icons')}
								</h3>
								<p>
									{__(
										'Include a download button inside the video pop up that allows your users to download Wordpress menu icons feed videos directly from your site.',
										'wp-menu-icons'
									)}
								</p>
							</div>
							<div className="feature-section">
								<h3>
									{__(
										'Customize Videos display',
										'wp-menu-icons'
									)}
								</h3>
								<p>
									{__(
										'Customize the colors of the Wordpress menu icons Feed including custom background, text, buttons background and mouseover effects, Videos padding, and a rounded border. It also includes the user or tag profile info in the header of the box.',
										'wp-menu-icons'
									)}
								</p>
							</div>
							<div className="feature-section">
								<h3>
									{__(
										'Card and box Videos display',
										'wp-menu-icons'
									)}
								</h3>
								<p>
									{__(
										'Wordpress menu icons Feed allows to display videos on a customized box. Or display videos into cards with video data in it.ed including custom background, text, buttons background and mouseover effects, Videos padding, and a rounded border.',
										'wp-menu-icons'
									)}
								</p>
							</div>
							<div className="feature-section">
								<h3>
									{__('Load more button', 'wp-menu-icons')}
								</h3>
								<p>
									{__(
										'Allow your users to load more videos in the gallery providing an improved user experience.',
										'wp-menu-icons'
									)}
								</p>
							</div>
						</div>
						<div className="column">
							<img
								src={getPluginURL(
									'/assets/backend/img/mobile.png'
								)}
							/>
						</div>
					</div>
					<div className="has-2-columns is-wider-left">
						<div className="column">
							<img
								src={getPluginURL(
									'/assets/backend/img/wp-menu-icons-2.png'
								)}
							/>
						</div>
						<div className="column">
							<br />
							<div className="welcome-header">
								<h1>{__('Video cards', 'wp-menu-icons')}</h1>
								<div className="about-description">
									{__(
										'Wrap Wordpress menu icons feed videos inside a box and display descriptions.',
										'wp-menu-icons'
									)}
								</div>
							</div>
							<hr />
							<div className="feature-section">
								<p>
									{__(
										'Our premium version allows you to include a beautiful card around the video where you can display the number of comments, likes, and video descriptions.',
										'wp-menu-icons'
									)}
								</p>
							</div>
						</div>
					</div>
					<div className="has-2-columns is-wider-left">
						<div className="column">
							<div className="welcome-header">
								<h1>{__('Layouts', 'wp-menu-icons')}</h1>
								<div className="about-description">
									{__(
										'Unlock the power of the carousel and highlight layouts that allows you to display the Wordpress menu icons Feeds in a grid that supports items of variable size.',
										'wp-menu-icons'
									)}
								</div>
							</div>
							<hr />
							<div className="feature-section">
								<h3>{__('Boxed layout', 'wp-menu-icons')}</h3>
								<p>
									{__(
										'This option wraps the feed gallery inside a box where you can include the profile user info, tag info or displayed trend data.',
										'wp-menu-icons'
									)}
								</p>
							</div>
							<div className="feature-section">
								<h3>
									{__('Carousel layout', 'wp-menu-icons')}
								</h3>
								<p>
									{__(
										'The carousel layout displays multiple videos inside an animated carousel with pagination and navigation controls. Including two alternative size for corousel: square and vertical options.',
										'wp-menu-icons'
									)}
								</p>
							</div>
							<div className="feature-section">
								<h3>
									{__('Highlight layout', 'wp-menu-icons')}
								</h3>
								<p>
									{__(
										'The highlight layout is a grid that allows you to stand out some videos with two or three columns width size. Allowing highlight by tag, position or video id.'
									)}
								</p>
							</div>
						</div>
						<div className="column">
							<img
								src={getPluginURL(
									'/assets/backend/img/wp-menu-icons-1.jpeg'
								)}
							/>
						</div>
					</div>
				</div>
			</Fill.Content>
		</>
	);
};

export default Premium;
