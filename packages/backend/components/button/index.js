import classnames from 'classnames';

export const Button = ({
	isSecondary,
	href,
	title,
	target = '_self',
	tagName = 'a',
	className,
	children,
}) => {
	const TagName = tagName;

	return (
		<TagName
			className={classnames(
				'wpmi__button',
				isSecondary && 'wpmi__button--secondary',
				className
			)}
			href={href}
			target={target}
			title={title}
		>
			{children}
		</TagName>
	);
};
