import SidebarItem from 'components/stateless/Sidebar/SidebarItem';
import style from './Sidebar.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Sidebar() {
    const [menuVisible, setMenuVisible] = useState(!checkIsMobile());
    const bringMenuInView = () => {
        setMenuVisible(true);
    };
    const hideMenu = () => {
        setMenuVisible(false);
    };
    function checkIsMobile() {
        return window.innerWidth < 768;
    }
    return (
        <div>
            <i
                onClick={bringMenuInView}
                className={`bx bx-menu-alt-left ${style.menuIcon}`}
                style={{ color: '#000000', fontSize: '2rem' }}
            ></i>
            <aside
                className={style.root}
                style={{ transform: menuVisible ? 'translate(0,0)' : 'translate(-100%,0)' }}
            >
                <div className={style.rootInnerWrapper}>
                    <div className={style.titleContainer}>
                        <i className={`bx bx-x ${style.closeMenuIcon}`} onClick={hideMenu}></i>
                        <Link className={style.title} to="/">
                            <h6>TaskMaster</h6>
                        </Link>
                    </div>

                    <ul className={style.menuContainer}>
                        <SidebarItem
                            href="/task"
                            icon={
                                <i
                                    className="bx bx-plus"
                                    style={{ color: '#ffffff', fontWeight: '800' }}
                                ></i>
                            }
                            className={style.addNewButton}
                        >
                            Add New
                        </SidebarItem>
                        <SidebarItem href="/task/list/due-today">
                            <i
                                className="bx bx-calendar-exclamation"
                                style={{ color: '#323232', fontSize: '1.1rem' }}
                            ></i>
                            Due Today
                        </SidebarItem>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
export default Sidebar;
