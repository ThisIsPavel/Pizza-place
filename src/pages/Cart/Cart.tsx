import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import styles from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../helpers/API";
import CartItem from "../../components/CartItem/CartItem";
import { IProduct } from "../../Interfaces/product.interface";
import Loader from "../../components/Loader/Loader";
import { cartActions } from "../../store/cart.slice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadCartProducts();
  }, [items]);

  const getItems = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${BASE_URL}/products/${id}`);
    return data;
  };

  const loadCartProducts = async () => {
    try {
      const products = await Promise.all(
        items.map((item) => getItems(item.id))
      );
      setCartProducts(products);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  const sendOrder = () => {
    if (!jwt) {
      alert(
        "Чтобы оформить заказ - зарегистрируйтесь или войдите в Ваш аккаунт "
      );
      return;
    }
    const userOrderInfo = items.map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return;
      }
      return { count: i.count, product: product.name };
    });
    console.log(userOrderInfo);
    dispatch(cartActions.clear());
  };
  const getTotalPrice = () => {
    if (items.length > 0) {
      const priceOfProducts = items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return 0;
        }
        return i.count * product.price;
      });
      return priceOfProducts.reduce((sum, pSum) => (sum += pSum));
    }
    return 0;
  };
  return (
    <article className={styles["cart"]}>
      <Heading headingLevel="h1">Корзина</Heading>
      {isLoading && <Loader />}
      {!isLoading && cartProducts?.length === 0 && (
        <p className={styles["cart__empty"]}>Корзина пустая</p>
      )}
      {!isLoading && cartProducts?.length !== 0 && (
        <ul className={styles["cart__list"]}>
          {items?.map((item) => {
            const product = cartProducts?.find((el) => item.id === el.id);
            if (!product) {
              return;
            }
            return <CartItem count={item.count} {...product} key={item.id} />;
          })}
          <li className={styles["cart__row"]}>
            <p className={styles["cart__total"]}>Итого:</p>
            <p className={styles["cart__total"]}>{getTotalPrice()} ₽</p>
          </li>
          <Button
            appearence="big"
            className={styles["cart__orderbutton"]}
            onClick={sendOrder}
          >
            Оформить
          </Button>
        </ul>
      )}
    </article>
  );
};

export default Cart;
