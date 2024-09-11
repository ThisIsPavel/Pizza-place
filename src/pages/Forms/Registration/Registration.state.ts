import {
  Actions,
  IAction,
  IForm,
  IPayload,
  IState,
  IValidity,
} from "../../../Interfaces/formData.interface";
export const INIT_STATE: IForm = {
  isValid: {
    email: true,
    password: true,
    name: true,
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
    {
      name: "name",
      labelName: "Ваш Имя",
      placeholder: "Имя",
      value: "",
    },
  ],
  isFormReadyToSubit: false,
};

function isRequiredFieldFilled(payload: IPayload) {
  const validityField: IValidity = {};
  for (const key in payload) {
    validityField[key] = !!payload[key];
  }
  return validityField;
}

export function formReducer(state: IForm, { type, payload }: IAction): IForm {
  switch (type) {
    case Actions.Clear: {
      return INIT_STATE;
    }
    case Actions.Reset:
      return { ...state, isValid: INIT_STATE.isValid };
    case Actions.Fill: {
      if (payload) {
        const FormAllReady = Object.values(
          isRequiredFieldFilled(payload)
        ).every((item) => item);
        return {
          ...state,
          isValid: {
            ...state.isValid,
            ...isRequiredFieldFilled(payload),
          },
          isFormReadyToSubit: FormAllReady,
        };
      }
      return INIT_STATE;
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
