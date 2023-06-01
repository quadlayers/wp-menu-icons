/**
 * External dependencies
 */
import classnames from 'classnames';

const AccountButton = (props) => {
	const { href, target = '_self', title, children, className } = props;

	return (
		<a
			href={href}
			className={classnames('wp-menu-icons__account-button', className)}
			target={target}
			title={title}
		>
			{children}
		</a>
	);
};

export default AccountButton;
