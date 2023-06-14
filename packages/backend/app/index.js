import { EditorSnackbars } from '@wordpress/editor';

/**
 * Internal dependencies
 */

import { AppTabSwitcher } from './components/tabs';
import { AppProvider } from './provider';
import { AppStructure } from './structure';
import { useAppSlotContext } from './structure/provider';

export const App = () => {
	return (
		<>
			<AppProvider>
				<AppStructure>
					<AppTabSwitcher />
				</AppStructure>
			</AppProvider>
			<EditorSnackbars />
		</>
	);
};

export { AppTabSwitcher, AppProvider, AppStructure, useAppSlotContext };

export * from './components';
