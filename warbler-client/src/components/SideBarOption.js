import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBarOption({route, icon, text}) {
    return (
        <div className="sidebarOption">
            <NavLink exact to={ route } activeClassName="selected">
                <i className={ icon }> <strong>{ text }</strong></i>
                
                {/* <span className="nav-text">Home</span> */}
            </NavLink>
        </div>
    )
}

export default SideBarOption
