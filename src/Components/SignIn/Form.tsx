import {Button, Input} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {setLocalStorageValue} from "../../helpers/localStorage";
import {MAIN} from "../../helpers/consts";
import {loginMutationGQL} from "../../Auth/graphql/mutations/login";
import {useNavigate} from "react-router-dom";

type Inputs = {
    email: string,
    password: string,
};

export const CustomForm = () => {

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

    return <form onSubmit={handleSubmit(onSubmit)} style={{"width": "300px", margin: "auto", paddingTop: "40vh"}}>
        <Controller name="email" control={control}
                    render={({field}) =>
                        <Input placeholder="email" {...field} style={{margin: "15px 0"}}/>}/>
        {errors.email && <span>This field is required</span>}
        <Controller name="password" control={control}
                    render={({field}) =>
                        <Input placeholder="password" type={"password"} {...field} width={400}
                               style={{margin: "15px 0"}}/>}/>
        {errors.password && <span>This field is required</span>}
        <Button type="primary" htmlType="submit">
            Sign in
        </Button>
    </form>
}
