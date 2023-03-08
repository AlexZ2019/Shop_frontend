import * as React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_WITH_GOOGLE_MUTATION } from "../../graphql/mutations/loginWithGoogle";
import { setTokensToLocalStorage } from "../../../../utils/localStorage";
import RoutePaths from "../../../../constants/routePaths";
import { useNavigate } from "react-router-dom";
import { USER_QUERY } from "../../../user/graphql/queries/getUser";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const GoogleForm = () => {
  const navigate = useNavigate();
  const [fetchUser, { loading }] = useLazyQuery(USER_QUERY);
  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE_MUTATION, {
    onCompleted: async (data: { loginWithGoogle: { accessToken: string; refreshToken: string } }) => {
      const tokens = data.loginWithGoogle;
      setTokensToLocalStorage(tokens);
      await fetchUser();
      navigate(RoutePaths.main);
    }
  });

  const onSuccessHandler = async (credentialResponse: CredentialResponse) => {
      await loginWithGoogle({ variables: { token: credentialResponse.credential }});
    }

  return <GoogleLogin
    size='medium'
    type='icon'
    onSuccess={onSuccessHandler}
    useOneTap
  />
}

export default GoogleForm;
