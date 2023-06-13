import { __ } from '@wordpress/i18n';

import Sidebar from "../sidebar";
import Toolbar from "../toolbar";

export default function Body({ children, toolbar, onChangeToolbar, toolbarSearchIn, sidebarContent, sidebarPosition }) {
    return <div class="media-modal-content">
        <div class="media-frame mode-select wp-core-ui">
            <div class="media-frame-menu">
                <div class="media-menu">
                    <a href="#" class="media-menu-item active">
                        {__('Featured Image', 'wp-menu-icons')}
                    </a>
                </div>
            </div>

            <div class="media-frame-content" data-columns="8">
                <div class="attachments-browser">
                    {toolbar &&
                        <Toolbar
                            onChange={onChangeToolbar}
                            searchIn={toolbarSearchIn}
                            sidebarPosition={sidebarPosition}
                        />
                    }

                    <div class={`attachments test wpmi__modal__sidebar--${sidebarPosition}`}>
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