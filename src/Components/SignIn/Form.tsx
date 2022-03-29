import {Button, Form, Input} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../Apollo/mutations/login";
import {storeData} from "../../helpers/localStorage";

type Inputs = {
    email: string,
    password: string,
};

export const CustomForm = () => {

    const {register, handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, { data, loading, error }] = useMutation(LOGIN);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        login({variables: data}).then(r => {
            storeData("accessToken", r.data.login.accessToken);
            storeData("refreshToken", r.data.login.refreshToken);
        });
     };

    // @ts-ignore
    return <form onSubmit={handleSubmit(onSubmit)} style={{"width": "300px", margin: "auto", paddingTop: "40vh"}}>
        <Controller name="email" control={control} render={({field}) => <Input placeholder="email" {...field} style={{margin: "15px 0"}} />}/>
        {errors.email && <span>This field is required</span>}
        <Controller name="password" control={control}
                    render={({field}) => <Input placeholder="password" type={"password"} {...field} width={400} style={{margin: "15px 0"}}/>}/>
        {errors.password && <span>This field is required</span>}
        <Button type="primary" htmlType="submit" loading={loading} >
            Sign in
        </Button>
    </form>
}
