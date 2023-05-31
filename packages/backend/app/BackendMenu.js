/**
 * WordPress dependencies
 */

import { EditorSnackbars, EditorNotices } from '@wordpress/editor';

/**
 * Internal dependencies
 */

import { AppTabSwitcher } from './components/tabs';
import { AppProvider } from './provider';
import { AppStructure } from './structure';
import { useAppSlotContext } from './structure/provider';

const BackendMenu = () => {
	return (
		<>
			<AppProvider>
				<AppStructure>
					<AppTabSwitcher />
				</AppStructure>
			</AppProvider>
			{EditorSnackbars ? <EditorSnackbars /> : <EditorNotices />}
		</>
	);
};

export default BackendMenu;
export { AppTabSwitcher, AppProvider, AppStructure, useAppSlotContext };

export * from './components';
