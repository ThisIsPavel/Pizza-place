import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { IProduct } from "../../Interfaces/product.interface";
import Loader from "../../components/Loader/Loader";
import cn from "classnames";

import styles from "./ProductInfo.module.css";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";

const ProductInfo = () => {
  const data = useLoaderData() as { result: IProduct };
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={data.result}>
        {({ data }: { data: IProduct }) => {
          return (
            <article className={styles["product"]}>
              <div className={styles["product__card"]}>
                <header>
                  <Heading headingLevel="h1">{data.name}</Heading>
                </header>
                <div className={styles["product__card-content"]}>
                  <div className={styles["product__card-left"]}>
                    <img src={data.image} alt="Изображение пиццы" />
                  </div>
                  <div className={styles["product__card-right"]}>
                    <p
                      className={cn(
                        styles["product__card-price"],
                        styles["product__card-item"]
                      )}
                    >
                      Цена
                      <span>{data.price} ₽</span>
                    </p>
                    <p
                      className={cn(
                        styles["product__card-rating"],
                        styles["product__card-item"]
                      )}
                    >
                      Рейтинг
                      <span>{data.rating}</span>
                    </p>
                    <ul className={styles["product__card-ingridients"]}>
                      <p className={styles["product__card-title"]}>Состав:</p>
                      {data.ingredients.map((ing) => (
                        <li className={styles["product__card-ingridient"]}>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <Button appearence="small">В корзину</Button>
                </div>
              </div>
            </article>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ProductInfo;
