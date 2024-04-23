import SidebarItem from 'components/stateless/Sidebar/SidebarItem';
import style from './Sidebar.module.css';
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <aside className={style.root}>
            <div className={style.rootInnerWrapper}>
                <div className={style.titleContainer}>
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
    );
}
export default Sidebar;
