import classnames from "classnames";

const Button = ({
	isSecondary,
	href,
	title,
	target = "_self",
	tagName = "a",
	className,
	children,
}) => {
	const TagName = tagName;

	return (
		<TagName
			className={classnames(
				"insta-gallery__button",
				isSecondary && "insta-gallery__button--secondary",
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

export default Button;
