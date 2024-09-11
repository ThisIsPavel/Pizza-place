import {
  Actions,
  IForm,
  IFormAction,
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

export function formReducer(state: IForm, action: IFormAction): IForm {
  switch (action.type) {
    case Actions.Clear: {
      return INIT_STATE;
    }
    case Actions.Reset:
      return { ...state, isValid: INIT_STATE.isValid };
    case Actions.Fill: {
      if (action.payload) {
        const FormAllReady = Object.values(
          isRequiredFieldFilled(action.payload)
        ).every((item) => item);
        return {
          ...state,
          isValid: {
            ...state.isValid,
            ...isRequiredFieldFilled(action.payload),
          },
          isFormReadyToSubit: FormAllReady,
        };
      }
      return INIT_STATE;
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
