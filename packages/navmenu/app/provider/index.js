/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { applyFilters } from "@wordpress/hooks";

import {
	createContext,
	useReducer,
	useContext,
	useEffect,
} from "@wordpress/element";

/**
 * Internal dependencies
 */

import Welcome from "../components/tabs/welcome";
import Settings from "../components/tabs/settings";
//import Accounts from "../components/tabs/accounts";
//import Feeds from "../components/tabs/feeds";
//import Premium from "../components/tabs/premium";
//import Suggestions from "../components/tabs/suggestions";

import { useBrowserParams } from "./helpers";

const { tabParam, setBrowserTabParam } = useBrowserParams();

const getDefaultState = ({ defaultTab }) => {
	return {
		currentTab: tabParam ? tabParam : defaultTab,
		currentTabSection: "",
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
		case "SET_CURRENT_TAB": {
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
	const TABS = applyFilters("insta-gallery.app.tabs", [
		{
			label: __("Welcome", "insta-gallery"),
			name: "welcome",
			content: Welcome,
		},
		//{
		//	label: __("Accounts", "insta-gallery"),
		//	name: "accounts",
		//	content: Accounts,
		//},
		//{
		//	label: __("Feeds", "insta-gallery"),
		//	name: "feeds",
		//	content: Feeds,
		//},
		{
			label: __("Settings", "insta-gallery"),
			name: "settings",
			href: "settings",
			content: Settings,
		},
		//{
		//	label: __("Premium", "insta-gallery"),
		//	name: "premium",
		//	content: Premium,
		//},
		//{
		//	label: __("Suggestions", "insta-gallery"),
		//	name: "suggestions",
		//	content: Suggestions,
		//},
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
			type: "SET_CURRENT_TAB",
			payload: {
				currentTab,
			},
		});
	};

	useEffect(() => {
		const wp_nav = Array.from(
			document.querySelectorAll("#toplevel_page_qligg > ul > li")
		);
		const currentTab =
			state.currentTab[0].toUpperCase() +
			state.currentTab.slice(1).toLowerCase();
		wp_nav.map((e) => {
			if (e.innerText === currentTab) {
				return e?.classList.add("current");
			}
			return e?.classList.remove("current");
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
