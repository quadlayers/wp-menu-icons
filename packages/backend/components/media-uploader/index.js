import PropTypes from 'prop-types';

import classnames from 'classnames';

import { Component } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

import { Button } from '@wordpress/components';

class ImageUploader extends Component {
	constructor() {
		super(...arguments);

		this.updateAttachmentInfo = this.updateAttachmentInfo.bind(this);

		this.params = {
			height: 250,
			width: 250,
			flex_width: true,
			flex_height: true,
		};
	}

	onChange(attachment) {
		this.props.onChange({
			attachment_id: attachment.id,
			name: attachment.name,
			x: 0,
			y: 0,
			url: attachment.url,
			type: attachment.type,
		});
	}

	/**
	 * Create a media modal select frame, and store it so the instance can be reused when needed.
	 */
	initFrame() {
		const buttonClose = document.querySelector('.media-modal-close');

		this.frame = wp.media({
			button: {
				text: __('Select', 'wp-menu-icons'),
				close: false,
			},
			states: [
				new wp.media.controller.Library({
					title: __('Select logo', 'wp-menu-icons'),
					library: wp.media.query({
						type: this.props.allowedTypes || ['image'],
					}),
					multiple: false,
					date: false,
					priority: 20,
					suggestedWidth: (this.props.logo || {}).width,
					suggestedHeight: (this.props.logo || {}).height,
				}),

				...(this.props.skipCrop || true
					? []
					: [
							new wp.media.controller.CustomizeImageCropper({
								imgSelectOptions:
									this.calculateImageSelectOptions,
								control: this,
							}),
					  ]),
			],
		});
		this.frame.on('select', this.onSelect, this);
		this.frame.on('close', () => {
			this.props.onFrameClose && this.props.onFrameClose();
			// console.log(this.frame)
		});
		this.frame.on('cropped', this.onCropped, this);
		this.frame.on('skippedcrop', this.onSkippedCrop, this);
		//subscribe to delete event and trigger onChange({}) if current selected image is value image
		//this.frame.on('delete', () => alert('delete!'), this)
	}

	/**
	 * Open the media modal to the library state.
	 */
	openFrame() {
		this.initFrame();
		this.frame.setState('library').open();
		this.props.onFrameOpen && this.props.onFrameOpen();
	}

	/**
	 * After an image is selected in the media modal, switch to the cropper
	 * state if the image isn't the right size.
	 */
	onSelect() {
		const attachment = this.frame.state().get('selection').first().toJSON();

		if (
			((this.props.logo || {}).width === attachment.width &&
				(this.props.logo || {}).height === attachment.height &&
				!(this.props.logo || {}).flex_width &&
				!(this.props.logo || {}).flex_height) ||
			this.props.skipCrop ||
			true
		) {
			this.setImageFromAttachment(attachment);
			this.frame.close();
		} else {
			this.frame.setState('cropper');
		}
	}

	/**
	 * After the image has been cropped, apply the cropped image data to the setting.
	 *
	 * @param {Object} croppedImage Cropped attachment data.
	 */
	onCropped(croppedImage) {
		this.setImageFromAttachment(croppedImage);
	}

	/**
	 * Returns a set of options, computed from the attached image data and
	 * control-specific data, to be fed to the imgAreaSelect plugin in
	 * wp.media.view.Cropper.
	 *
	 * @param {wp.media.model.Attachment}   attachment
	 * @param {wp.media.controller.Cropper} controller
	 * @returns {Object} Options
	 */
	calculateImageSelectOptions(attachment, controller) {
		const control = controller.get('control');
		const flexWidth = !!parseInt((control.props.logo || {}).flex_width, 10);
		const flexHeight = !!parseInt(
			(control.props.logo || {}).flex_height,
			10
		);
		const realWidth = attachment.get('width');
		const realHeight = attachment.get('height');
		let xInit = parseInt((control.props.logo || {}).width, 10);
		let yInit = parseInt((control.props.logo || {}).height, 10);
		const ratio = xInit / yInit;
		const xImg = xInit;
		const yImg = yInit;
		let x1;
		let y1;
		let imgSelectOptions;

		controller.set(
			'canSkipCrop',
			!control.mustBeCropped(
				flexWidth,
				flexHeight,
				xInit,
				yInit,
				realWidth,
				realHeight
			)
		);

		if (realWidth / realHeight > ratio) {
			yInit = realHeight;
			xInit = yInit * ratio;
		} else {
			xInit = realWidth;
			yInit = xInit / ratio;
		}

		x1 = (realWidth - xInit) / 2;
		y1 = (realHeight - yInit) / 2;

		imgSelectOptions = {
			handles: true,
			keys: true,
			instance: true,
			persistent: true,
			imageWidth: realWidth,
			imageHeight: realHeight,
			minWidth: xImg > xInit ? xInit : xImg,
			minHeight: yImg > yInit ? yInit : yImg,
			x1,
			y1,
			x2: xInit + x1,
			y2: yInit + y1,
		};

		if (flexHeight === false && flexWidth === false) {
			imgSelectOptions.aspectRatio = xInit + ':' + yInit;
		}

		if (true === flexHeight) {
			delete imgSelectOptions.minHeight;
			imgSelectOptions.maxWidth = realWidth;
		}

		if (true === flexWidth) {
			delete imgSelectOptions.minWidth;
			imgSelectOptions.maxHeight = realHeight;
		}

		return imgSelectOptions;
	}

	/**
	 * Return whether the image must be cropped, based on required dimensions.
	 *
	 * @param {bool} flexW
	 * @param {bool} flexH
	 * @param {int}  dstW
	 * @param {int}  dstH
	 * @param {int}  imgW
	 * @param {int}  imgH
	 * @return {bool}
	 */
	mustBeCropped(flexW, flexH, dstW, dstH, imgW, imgH) {
		if (true === flexW && true === flexH) {
			return false;
		}

		if (true === flexW && dstH === imgH) {
			return false;
		}

		if (true === flexH && dstW === imgW) {
			return false;
		}

		if (dstW === imgW && dstH === imgH) {
			return false;
		}

		if (imgW <= dstW) {
			return false;
		}

		return true;
	}

	/**
	 * If cropping was skipped, apply the image data directly to the setting.
	 */
	onSkippedCrop() {
		const attachment = this.frame.state().get('selection').first().toJSON();

		this.setImageFromAttachment(attachment);
	}

	/**
	 * Updates the setting and re-renders the control UI.
	 *
	 * @param {Object} attachment
	 */
	setImageFromAttachment(attachment) {
		this.onChange(attachment);
		this.updateAttachmentInfo();
	}

	updateAttachmentInfo(force = false) {
		const id = this.props.value?.attachment_id;
		if (!id) return;

		this.detachListener();
		wp.media.attachment(id).on('change', this.updateAttachmentInfo);
	}

	detachListener() {
		if (!this.props.value?.attachment_id) return;

		wp.media
			.attachment(this.props.value.attachment_id)
			.off('change', this.updateAttachmentInfo);
	}

	componentDidMount() {
		this.updateAttachmentInfo();
	}

	componentWillUnmount() {
		this.detachListener();
	}

	render() {
		return (
			<div
				className={classnames(
					'wp-menu-icons-control-media-upload__attachment',
					this.props.value?.attachment_id &&
						this.props.value &&
						'is-active'
				)}
				{...(this.props.attr || {})}
			>
				{(this.props.value?.attachment_id || this.props.value?.url) && (
					<div
						className="thumbnail thumbnail-image"
						onClick={() =>
							!this.props.allowPositionPicker && this.openFrame()
						}
					>
						{!this.props.allowPositionPicker && (
							<img
								className="attachment-thumb"
								src={this.props.value?.url || ''}
								draggable="false"
								alt=""
							/>
						)}
					</div>
				)}
				<div className="wp-menu-icons-control-media-upload__attachment__actions">
					{this.props.value?.attachment_id ||
					this.props.value?.url ? (
						<>
							<Button
								disabled={
									!(
										Number(
											this.props.value?.attachment_id
										) > 1
									) &&
									typeof this.props.onRemove !== 'function'
								}
								onClick={() => {
									if (
										typeof this.props.onRemove ===
										'function'
									) {
										this.props.onRemove();
										return;
									}
									this.props.onChange();
								}}
							>
								{__('Remove', 'wp-menu-icons')}
							</Button>
							<Button isBordered onClick={() => this.openFrame()}>
								{this.props.filledLabel ||
									__('Change', 'wp-menu-icons')}
							</Button>
						</>
					) : (
						<Button
							className={classnames(
								'wp-menu-icons-control-media-upload__attachment__upload',
								'upload_image_button button'
							)}
							onClick={() => this.openFrame()}
							style={{ display: 'inline-block' }}
						>
							{this.props.emptyLabel ||
								__('Select image', 'wp-menu-icons')}
						</Button>
					)}
				</div>
			</div>
		);
	}
}

ImageUploader.renderingConfig = {
	hasRevertButton: false,
};

ImageUploader.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
};

export default ImageUploader;
