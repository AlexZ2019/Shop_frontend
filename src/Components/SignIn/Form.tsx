import {Button, Input} from "antd";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "../../Apollo/mutations/login";

type Inputs = {
    email: string,
    password: string,
};

export const CustomForm = () => {

    const {handleSubmit, formState: {errors}, control} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, loading] = useLoginMutation();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
       // @ts-ignore
        await login(data.email, data.password)
     };

    return <form onSubmit={handleSubmit(onSubmit)} style={{"width": "300px", margin: "auto", paddingTop: "40vh"}}>
        <Controller name="email" control={control} render={({field}) => <Input placeholder="email" {...field} style={{margin: "15px 0"}} />}/>
        {errors.email && <span>This field is required</span>}
        <Controller name="password" control={control}
                    render={({field}) => <Input placeholder="password" type={"password"} {...field} width={400} style={{margin: "15px 0"}}/>}/>
        {errors.password && <span>This field is required</span>}
        <Button type="primary" htmlType="submit">
            Sign in
        </Button>
    </form>
}
