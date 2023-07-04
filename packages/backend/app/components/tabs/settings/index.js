/**
 * Internal dependencies
 */

import Header from '../../header';
import Nav from '../../nav';
import { useAppSlotContext } from '../../../structure/provider';
import Container from './container';

const Settings = () => {
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
				<Container />
			</Fill.Content>
		</>
	);
};

export default Settings;
