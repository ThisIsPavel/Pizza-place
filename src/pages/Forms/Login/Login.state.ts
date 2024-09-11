import {
  Actions,
  IAction,
  IForm,
  IState,
} from "../../../Interfaces/formData.interface";
export const INIT_STATE: IForm = {
  isValid: {
    email: true,
    password: true,
  },
  formfileds: [
    {
      name: "email",
      labelName: "Ваш email",
      placeholder: "Email",
      value: "",
    },
    {
      name: "password",
      labelName: "Ваш пароль",
      placeholder: "Пароль",
      value: "",
    },
  ],
  isFormReadyToSubit: false,
};

export function formReducer(state: IForm, { type, payload }: IAction): IForm {
  switch (type) {
    case Actions.Clear: {
      return INIT_STATE;
    }
    case Actions.Reset:
      return { ...state, isValid: INIT_STATE.isValid };
    case Actions.Fill: {
      if (
        typeof payload?.email == "string" &&
        typeof payload?.password == "string"
      ) {
        const isValidEmail: boolean = !!payload?.email.trim().length;
        const isValidPassword: boolean = !!payload?.password.trim().length;
        return {
          ...state,
          isValid: {
            email: isValidEmail,
            password: isValidPassword,
          },
          isFormReadyToSubit: isValidEmail && isValidPassword,
        };
      }
      return state;
    }
    case Actions.SetValue: {
      const newformField: IState[] = state.formfileds.map((field) => {
        if (payload && field.name in payload) {
          return { ...field, value: payload[field.name].toString() };
        } else {
          return field;
        }
      });
      return {
        ...state,
        formfileds: newformField,
      };
    }
    default:
      return state;
  }
}
