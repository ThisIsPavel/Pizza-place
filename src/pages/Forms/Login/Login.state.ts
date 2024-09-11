import {
  Actions,
  IForm,
  IFormAction,
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

export function formReducer(state: IForm, action: IFormAction): IForm {
  switch (action.type) {
    case Actions.Clear: {
      return INIT_STATE;
    }
    case Actions.Reset:
      return { ...state, isValid: INIT_STATE.isValid };
    case Actions.Fill: {
      if (
        typeof action.payload?.email == "string" &&
        typeof action.payload?.password == "string"
      ) {
        const isValidEmail: boolean = !!action.payload?.email.trim().length;
        const isValidPassword: boolean =
          !!action.payload?.password.trim().length;
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
        if (action.payload && field.name in action.payload) {
          return { ...field, value: action.payload[field.name].toString() };
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
