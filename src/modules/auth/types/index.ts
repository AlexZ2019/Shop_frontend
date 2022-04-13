import { Dispatch, ReactNode } from 'react';
import { Control, FieldError, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

export type OnCompleteData = {
  login: {
    accessToken: string;
    refreshToken: string;
  };
};

export type ChildrenProps = {
  children: ReactNode;
};

export type Inputs = {
  email: string;
  password: string;
};

export type FormProps = {
  onSubmit: SubmitHandler<Inputs>
  handleSubmit: UseFormHandleSubmit<Inputs>
  control: Control<Inputs>
  errors: { email?: FieldError | undefined; password?: FieldError | undefined }
  loading: boolean
};

export type User = {
  userId: string
  email: string
}

export interface State {
  user: User | null | false
}

export interface UserContextInterface extends State {
  dispatch: Dispatch<any>
}


