export enum Actions {
  Clear = "CLEAR",
  Reset = "RESET",
  Fill = "FILL",
  SetValue = "SET_VALUE",
}

export interface IState {
  name: string;
  labelName?: string;
  placeholder?: string;
  value: string;
}

export interface IValidity {
  [key: string]: boolean;
}

export interface IPayload {
  [key: string]: FormDataEntryValue | string;
}

export type IFormAction =
  | { type: Actions.Reset }
  | { type: Actions.Clear }
  | {
      type: Actions.Fill;
      payload: IPayload;
    }
  | {
      type: Actions.SetValue;
      payload: IPayload;
    };

export interface IForm {
  isValid: IValidity;
  formfileds: IState[];
  isFormReadyToSubit: boolean;
}
