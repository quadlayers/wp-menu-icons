import { __ } from '@wordpress/i18n';

import { AppSlotConsumer, AppSlotProvider } from './provider';

export const AppStructure = ( { children } ) => {
	/* TODO: implement condition and fix position issue */
	const condition = false;

	return (
		<AppSlotProvider>
			<AppSlotConsumer>
				{ ( { Slot, containerRef } ) => {
					return (
						<div ref={ containerRef }>
							<header>
								<Slot.Header />
								{ condition && (
									<div>
										<div
											className="notice welcome-tab wrap about-wrap full-width-layout"
											style={ {
												display: 'block!important',
											} }
										>
											<div
												className="notice-container"
												style={ {
													paddingTop: 10,
													paddingBottom: 10,
													display: 'flex',
													justifyContent: 'left',
													alignItems: 'center',
												} }
											>
												<div className="notice-image"></div>
												<div
													className="notice-content"
													style={ {
														marginLeft: 15,
													} }
												>
													<p>
														<b>
															{ __(
																'Action Required Within 7 Days:',
																'wp-menu-icons'
															) }
														</b>
														<br />
														{ __(
															'Your Instagram feed has been not viewed in the last 14 days. Due to Instagram data privacy rules, all data for this feed will be deleted in 7 days time. To avoid automated data deletion, simply view the Instagram feed on your website within the next 7 days.',
															'wp-menu-icons'
														) }
														<br />
														{ __(
															'Or you can simply press the "Fix Usage" button to fix this issue.',
															'wp-menu-icons'
														) }
													</p>
													<a
														onClick={ () =>
															// eslint-disable-next-line no-alert
															alert( 'clicked' )
														}
														className="button-primary"
														target="_blank"
													>
														{ __(
															'Fix Usage',
															'wp-menu-icons'
														) }
													</a>
												</div>
											</div>
										</div>
									</div>
								) }
							</header>
							<section>
								<nav>
									<Slot.Navigation />
								</nav>
								<section>
									<section>
										<Slot.Content />
									</section>
									<aside>
										<Slot.Aside />
									</aside>
								</section>
								<footer>
									<Slot.Footer />
								</footer>
							</section>
							{ children }
						</div>
					);
				} }
			</AppSlotConsumer>
		</AppSlotProvider>
	);
};
