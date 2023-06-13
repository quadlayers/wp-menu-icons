import classnames from "classnames";

/**
 * WordPress dependencies
 */

import { useEffect } from "@wordpress/element";
/**
 * Internal dependencies
 */

import { useAppContext } from "../../provider";
import { activeSubmenuItems } from "./helpers";

function Nav() {
	const { currentTab, setCurrentTab, tabs } = useAppContext();

	useEffect(() => {
		activeSubmenuItems(currentTab);
	}, [currentTab]);

	return (
		<div className="wrap about-wrap full-width-layout">
			<ul className="nav-tab-wrapper">
				{tabs.map(({ label, name }, index) => {
					return (
						<li
							key={index}
							className="wpmi__nav-tab-li"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setCurrentTab(name);
							}}
						>
							<a
								href="#"
								className={classnames(
									"nav-tab",
									currentTab === name && "nav-tab-active"
								)}
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								{label}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Nav;
