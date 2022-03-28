import {Button, Form, Input} from "antd";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../Apollo/mutations/login";

type Inputs = {
    email: string,
    password: string,
};

export const CustomForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, { data, loading, error }] = useMutation(LOGIN);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        login({variables: data}).then(r => r)
     }

    // @ts-ignore
    return <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="email" {...register("email", {required: true})}/>
        {errors.email && <span>This field is required</span>}
        <input placeholder="password" type={"password"} {...register("password", {required: true})}/>
        {errors.password && <span>This field is required</span>}
        <Button type="primary" htmlType="submit" loading={loading} >
            Submit
        </Button>
    </form>
}
