/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

import {
	createContext,
	useReducer,
	useContext,
	useEffect,
} from '@wordpress/element';

/**
 * Internal dependencies
 */

import Welcome from '../components/tabs/welcome';
import Settings from '../components/tabs/settings';
import Suggestions from '../components/tabs/suggestions';
import Premium from '../components/tabs/premium';
import { useBrowserParams } from './helpers';

const { tabParam, setBrowserTabParam } = useBrowserParams();

const getDefaultState = ({ defaultTab }) => {
	return {
		currentTab: tabParam ? tabParam : defaultTab,
		currentTabSection: '',
		prevTab: null,
		prevSubTab: null,
		user: false,
	};
};

const AppContext = createContext({});

const useAppContext = () => {
	return useContext(AppContext);
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_CURRENT_TAB': {
			return {
				...state,
				...action.payload,
				prevTab: state.currentTab,
			};
		}
	}
	return state;
};

const AppProvider = ({ children }) => {
	const TABS = applyFilters('wp-menu-icons.app.tabs', [
		{
			label: __('Welcome', 'wp-menu-icons'),
			name: 'welcome',
			content: Welcome,
		},
		{
			label: __('Settings', 'wp-menu-icons'),
			name: 'settings',
			href: 'settings',
			content: Settings,
		},
		{
			label: __('Premium', 'wp-menu-icons'),
			name: 'premium',
			content: Premium,
		},
		{
			label: __('Suggestions', 'wp-menu-icons'),
			name: 'suggestions',
			href: 'suggestions',
			content: Suggestions,
		},
	]);

	const [state, dispatch] = useReducer(
		reducer,
		getDefaultState({ defaultTab: TABS[0].name })
	);

	const setCurrentTab = (currentTab) => {
		if (state.currentTab == currentTab) {
			return;
		}

		setBrowserTabParam(currentTab);

		dispatch({
			type: 'SET_CURRENT_TAB',
			payload: {
				currentTab,
			},
		});
	};

	useEffect(() => {
		const wp_nav = Array.from(
			document.querySelectorAll('#toplevel_page_wpmi > ul > li')
		);
		const currentTab =
			state.currentTab[0].toUpperCase() +
			state.currentTab.slice(1).toLowerCase();
		wp_nav.map((e) => {
			if (e.innerText === currentTab) {
				return e?.classList.add('current');
			}
			return e?.classList.remove('current');
		});
	}, [state.currentTab]);

	return (
		<AppContext.Provider
			value={{
				...state,
				setCurrentTab,
				tabs: TABS,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const LibraryConsumer = AppContext.Consumer;

export { AppProvider, LibraryConsumer, useAppContext };
