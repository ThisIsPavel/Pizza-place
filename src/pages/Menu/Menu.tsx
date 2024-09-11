import { ChangeEvent, useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchInput from "../../components/SearchInput/SearchInput";
import { BASE_URL } from "../../helpers/API";
import styles from "./Menu.module.css";
import { IProduct } from "../../Interfaces/product.interface";
import axios, { AxiosError } from "axios";
import Loader from "../../components/Loader/Loader";

const Menu = () => {
  const [search, setSearch] = useState<string>();
  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMenu(search);
  }, [search]);

  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const getMenu = async (name?: string) => {
    try {
      setError(null);
      const { data } = await axios.get<IProduct[]>(`${BASE_URL}/products?`, {
        params: {
          name,
        },
      });
      setProducts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className={styles.menu}>
      <header className={styles["menu__header"]}>
        <Heading headingLevel="h1">Меню</Heading>
        <SearchInput
          placeholder="Введите название блюда"
          value={search}
          onChange={changeSearch}
        />
      </header>
      <div className={styles["menu__cards"]}>
        {error && <p>{error}</p>}
        {isLoading && <Loader />}
        {!isLoading && products?.length ? (
          products?.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              ingredients={product.ingredients}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))
        ) : (
          <p className={styles["menu__not-found"]}>Ничего не найден</p>
        )}
      </div>
    </article>
  );
};
export default Menu;
