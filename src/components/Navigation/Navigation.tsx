import { NavLink } from "react-router-dom";
import { ILinks } from "./Navigation.props";
import styles from "./Navigation.module.css";
import cn from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Navigation = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const getProductCounter = () => {
    return items.reduce((acc, item) => (acc += item.count), 0);
  };
  const links: Array<ILinks> = [
    { path: "/", title: "Меню", srcIcon: "/menu.svg" },
    { path: "/cart", title: "Корзина", srcIcon: "/cart.svg" },
  ];
  return (
    <nav className={styles["menu__nav"]}>
      <ul className={styles["menu__list"]}>
        {links.map((link) => (
          <li className={styles["menu__item"]} key={link.title}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                cn(styles["menu__link"], {
                  [styles["menu__link--active"]]: isActive,
                })
              }
            >
              <img
                className={styles["menu__icon-link"]}
                src={link.srcIcon}
                alt={link.title}
              />
              {link.title}
              {link.title == "Корзина" && !!getProductCounter() ? (
                <span className={styles["menu__counter"]}>
                  {getProductCounter()}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
