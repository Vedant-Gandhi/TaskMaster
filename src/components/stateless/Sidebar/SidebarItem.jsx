import PropTypes from 'prop-types';
import style from './SidebarItem.module.css';
import { Link } from 'react-router-dom';

/**
 * SidebarItem component represents an item in a sidebar menu.
 * @param {Object} props - The props passed to the component.
 * @param {string} props.href - The URL to navigate to when the item is clicked.
 * @param {string} props.children - The text to display for the item.
 * @param {JSX.Element} props.icon - The icon to display for the item.
 * @param {string} props.className - The extra class name to be added.
 * @param {(event:any)=>void} props.onClick - The function to call when the item is clicked.
 * @returns {JSX.Element} - The SidebarItem component.
 */
function SidebarItem({ href, children, icon, onClick, className }) {
    return (
        <li className={`${style.root} ${className}`}>
            <Link to={href} onClick={onClick}>
                {icon}
                {children}
            </Link>
        </li>
    );
}

SidebarItem.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default SidebarItem;
