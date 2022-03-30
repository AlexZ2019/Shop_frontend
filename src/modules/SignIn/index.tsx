import * as React from "react";
import CustomForm from "./components/Form";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {loginMutationGQL} from "./graphql/mutations/login";
import {setLocalStorageValue} from "../../helpers/localStorage";
import {MAIN} from "../../helpers/consts";
import {Inputs} from "./types/types";

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
            navigate(MAIN);
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
