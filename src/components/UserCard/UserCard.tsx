import { IUserCard } from "./userCard.props";
import Heading from "../Heading/Heading";
import styles from "./UserCard.module.css";

const UserCard = (props: IUserCard) => {
  return (
    <div className={styles["user"]}>
      <img src="/avatar.png" alt="avatar" className={styles["user__avatar"]} />
      <div className={styles["user__info"]}>
        <Heading headingLevel="h3" className={styles["user__name"]}>
          {props.name}
        </Heading>
        <p className={styles["user__email"]}>{props.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
