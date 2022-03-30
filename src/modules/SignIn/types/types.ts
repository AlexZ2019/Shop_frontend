import {Control, FieldError, SubmitHandler, UseFormHandleSubmit} from "react-hook-form";

export type Inputs = {
    email: string,
    password: string,
};

export type FormProps = {
    onSubmit: SubmitHandler<Inputs>
    handleSubmit: UseFormHandleSubmit<{ email: string; password: string; }>
    control: Control<{ email: string; password: string; }>
    errors: { email?: FieldError | undefined; password?: FieldError | undefined; }
}
