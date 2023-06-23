/**
 * Internal dependencies
 */
import Header from '../../header';
import Nav from '../../nav';
import { List as PluginSuggestionsList } from 'wp-plugin-suggestions';
import { useAppSlotContext } from '../../../structure/provider';

const Suggestions = () => {
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
				<PluginSuggestionsList authorName="quadlayers" columns="2" />
			</Fill.Content>
		</>
	);
};

export default Suggestions;
