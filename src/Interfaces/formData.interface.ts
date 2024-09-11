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

export interface IAction {
  type: Actions;
  payload?: IPayload;
}

export interface IForm {
  isValid: IValidity;
  formfileds: IState[];
  isFormReadyToSubit: boolean;
}
