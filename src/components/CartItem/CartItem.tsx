import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./CartItem.module.css";
import cn from "classnames";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";

const CartItem = (props: CartItemProps) => {
  const { id, count, name, price, image } = props;
  const dispatch = useDispatch<AppDispatch>();
  const increase = () => {
    dispatch(cartActions.add(id));
  };
  const descrease = () => {
    dispatch(cartActions.remove(id));
  };
  const deleteItem = () => {
    dispatch(cartActions.delete(id));
  };
  return (
    <li className={cn(styles["item"], styles["item__row"])}>
      <div className={styles["item__left-column"]}>
        <img src={image} alt="Пицца" className={styles["item__item-img"]} />
        <div className={styles["item__right-column"]}>
          <Heading headingLevel="h3">{name}</Heading>
          <p className={styles["item__item-price"]}>{price} ₽</p>
        </div>
      </div>
      <div className={styles["item__actions"]}>
        <Button
          appearence="small"
          className={cn(styles["item__btn-decrement"], styles["item__btn"])}
          onClick={descrease}
        >
          -
        </Button>
        <span className={styles["item__count"]}>{count}</span>
        <Button
          appearence="small"
          className={styles["item__btn"]}
          onClick={increase}
        >
          +
        </Button>
      </div>
      <button className={styles["item__remove-btn"]} onClick={deleteItem}>
        X
      </button>
    </li>
  );
};

export default CartItem;
