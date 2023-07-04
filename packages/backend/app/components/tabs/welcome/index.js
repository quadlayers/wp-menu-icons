import Header from '../../header';
import Nav from '../../nav';

/**
 * Internal dependencies
 */

import { useAppSlotContext } from '../../../structure/provider';

import Content from './content';

const Welcome = () => {
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
				<Content />
			</Fill.Content>
		</>
	);
};

export default Welcome;
