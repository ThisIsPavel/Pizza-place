import { FormEvent, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { INIT_STATE, formReducer } from "./Login.state";
import { AppDispatch, RootState } from "../../../store/store";
import { getLogin, userActions } from "../../../store/user.slice";
import { Actions, IState } from "../../../Interfaces/formData.interface";

import Button from "../../../components/Button/Button";
import Heading from "../../../components/Heading/Heading";
import Input from "../../../components/Input/Input";

import styles from "./../Form.module.css";

const Login = () => {
  const [formState, dispatchFormState] = useReducer(formReducer, INIT_STATE);
  const { formfileds, isValid, isFormReadyToSubit } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt]);

  const sendLogin = async (email: string, password: string) => {
    dispatch(userActions.clearLoginErrorMessage());
    dispatch(getLogin({ email, password }));
  };

  useEffect(() => {
    let timerId: number;
    if (!isValid.email || !isValid.password) {
      timerId = setTimeout(() => {
        dispatchFormState({ type: Actions.Reset });
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubit) {
      const userData: { [key: string]: string } = {};
      formfileds.forEach((field) => {
        userData[field.name] = field.value;
      });
      sendLogin(userData.email, userData.password);
      dispatchFormState({ type: Actions.Clear });
    }
  }, [isFormReadyToSubit]);

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData);
    dispatchFormState({
      type: Actions.Fill,
      payload: formProps,
    });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatchFormState({
      type: Actions.SetValue,
      payload: { [e.currentTarget.name]: e.currentTarget.value },
    });
  };

  return (
    <form className={styles["form"]} onSubmit={handleSubmitForm}>
      <div className={styles["form__wrapper"]}>
        <Heading headingLevel="h3" className={styles["form__title"]}>
          Вход
        </Heading>
        {loginErrorMessage && (
          <p className={styles["form__error"]}>{loginErrorMessage}</p>
        )}
        {formfileds.map((field: IState) => (
          <Input
            isValid={isValid[field.name]}
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            label={field.labelName}
            value={field.value}
            onChange={(e) => handleChange(e)}
          />
        ))}
        <div className={styles["form__actions"]}>
          <Button appearence="big">Вход</Button>
        </div>
        <Link to="/auth/registration" className={styles["form__link"]}>
          Нет аккаунта? <hr />
          <span>Зарегистрироваться</span>
        </Link>
      </div>
    </form>
  );
};

export default Login;
