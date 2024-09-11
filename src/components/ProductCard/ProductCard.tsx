import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { IProduct } from "../../Interfaces/product.interface";

import BagIcon from "../../assets/svg/BagIcon/BagIcon";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";

import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

const ProductCard = (props: IProduct) => {
  const dispatch = useDispatch<AppDispatch>();
  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={`/product/${props.id}`} className={styles["card"]}>
      <header className={styles["card__header"]}>
        <div className={styles["card__wrapper-img"]}>
          <img
            src={props.image}
            alt="Изображение блюда"
            className={styles["card__img"]}
          />
          <div className={styles["image-filter"]}></div>
        </div>
        <p className={styles["card__price"]}>
          {props.price} <span className={styles["card__currency"]}>₽</span>
        </p>
        <Button
          appearence="small"
          className={styles["card__add-btn"]}
          onClick={addToCart}
        >
          <BagIcon className={styles["card__icon"]} />
        </Button>
        {props.rating && (
          <p className={styles["card__rating"]}>
            {props.rating} <span className={styles["card__star"]}>★</span>
          </p>
        )}
      </header>
      <div className={styles["card__footer"]}>
        <Heading headingLevel="h3" className={styles["card__title"]}>
          {props.name}
        </Heading>
        <p className={styles["card__ingredients"]}>
          {props.ingredients.toString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
