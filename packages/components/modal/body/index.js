import { __ } from '@wordpress/i18n';

import Sidebar from "../sidebar";
import Toolbar from "../toolbar";

export default function Body({ children, toolbar, onChangeToolbar, toolbarSearchIn, sidebarContent, sidebarPosition }) {
    return <div className="media-modal-content">
        <div className="media-frame mode-select wp-core-ui">
            <div className="media-frame-menu">
                <div className="media-menu">
                    <a href="#" className="media-menu-item active">
                        {__('Featured Image', 'wp-menu-icons')}
                    </a>
                </div>
            </div>

            <div className="media-frame-content" data-columns="8">
                <div className="attachments-browser">
                    {toolbar &&
                        <Toolbar
                            onChange={onChangeToolbar}
                            searchIn={toolbarSearchIn}
                            sidebarPosition={sidebarPosition}
                        />
                    }

                    <div className={`attachments wpmi__modal__sidebar--${sidebarPosition}`}>
                        { children }
                    </div>

                    {sidebarContent &&
                        <Sidebar
                            position={sidebarPosition}
                        >
                            { sidebarContent }
                        </Sidebar>
                    }
                </div>
            </div>
        </div>
    </div>
}
