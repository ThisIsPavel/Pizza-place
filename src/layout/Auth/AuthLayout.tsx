import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout = () => {
  return (
    <div className={styles["auth"]}>
      <div className={styles["auth__left"]}>
        <img
          className={styles["auth__logo"]}
          src="/Logo-pizza.png"
          alt="Логотип"
        />
      </div>
      <div className={styles["auth__right"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
