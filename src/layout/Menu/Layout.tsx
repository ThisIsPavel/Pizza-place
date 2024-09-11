import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions, getUserProfile } from "../../store/user.slice";

import Button from "../../components/Button/Button";
import ExitIcon from "../../assets/svg/ExitIcon/ExitIcon";
import UserCard from "../../components/UserCard/UserCard";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Layout.module.css";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const logout = () => {
    dispatch(userActions.logout());
  };

  useEffect(() => {
    if (user.jwt) {
      dispatch(getUserProfile());
    }
  }, []);
  return (
    <div className={styles["layout"]}>
      <aside className={styles["menu"]}>
        {user.userProfile && (
          <UserCard
            name={user.userProfile?.name}
            email={user.userProfile?.email}
          />
        )}
        <Navigation />
        <div className={styles["menu__actions"]}>
          {user.jwt ? (
            <Button appearence="small" onClick={logout}>
              <div className={styles["menu__btn-wrapper"]}>
                <ExitIcon className={styles["menu__btn-icon"]} />
                <span>Выйти</span>
              </div>
            </Button>
          ) : (
            <>
              <Link to="/auth/login">
                <Button appearence="small">Войти</Button>
              </Link>
              <Link to="/auth/registration">
                <Button appearence="small">Зарегистрироваться</Button>
              </Link>
            </>
          )}
        </div>
      </aside>
      <main className={styles["layout__content"]}>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
