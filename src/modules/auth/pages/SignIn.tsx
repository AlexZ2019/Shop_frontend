import * as React from "react";
import CustomForm from "../components/form";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {loginMutationGQL} from "../graphql/mutations/login";
import {setLocalStorageValue} from "../../../utils/localStorage";
import {Inputs} from "../types/types";
import routePaths from "../../../constants";

const SignIn = () => {
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
            navigate(routePaths.main);
        },
    });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await login({ variables: data})
    };

    return <div>
        <CustomForm onSubmit={onSubmit} handleSubmit={handleSubmit} control={control} errors={errors} />
  </div>
}

export default SignIn
