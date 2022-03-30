import {Button, Input} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {setLocalStorageValue} from "../../../../helpers/localStorage";
import {MAIN} from "../../../../helpers/consts";
import {useNavigate} from "react-router-dom";
import {loginMutationGQL} from "../../../Auth/graphql/mutations/login";
import s from "./index.module.css"

type Inputs = {
    email: string,
    password: string,
};

const CustomForm = () => {

    const navigate = useNavigate();
    const {handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login] = useMutation(loginMutationGQL, {
        onCompleted: (data: { login: { accessToken: string, refreshToken: string }}) => {
            setLocalStorageValue("accessToken", data.login.accessToken);
            setLocalStorageValue("refreshToken", data.login.refreshToken);
            navigate(MAIN);
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await login({ variables: data})
     };

    return <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Controller name="email" control={control}
                    render={({field}) =>
                        <Input placeholder="email" {...field} className={s.input}/>}/>
        {errors.email && <span>This field is required</span>}
        <Controller name="password" control={control}
                    render={({field}) =>
                        <Input placeholder="password" type={"password"} {...field}
                               className={s.input}/>}/>
        {errors.password && <span>This field is required</span>}
        <Button type="primary" htmlType="submit">
            Sign in
        </Button>
    </form>
}

export default CustomForm
