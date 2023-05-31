/**
 * add the .current class to wordpress submenu elements comparing the current tab with the submenu item inner text.
 *
 * @param {string} currentTab
 */

export const activeSubmenuItems = (currentTab) => {
	const menu = Array.from(
		document.querySelector("#toplevel_page_wp-menu-icons-pro .wp-submenu")?.children || []
	);
	// capitalize the first letter of the string
	const CapitalizedFirstLetterString =
		currentTab[0].toUpperCase() + currentTab.slice(1).toLowerCase();

	menu.forEach((nav) => {
		if (nav.innerText.trim() === CapitalizedFirstLetterString) {
			nav.classList.add("current");
		} else {
			nav.classList.remove("current");
		}
	});
};
