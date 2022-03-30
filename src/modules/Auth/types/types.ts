import {ReactNode} from "react";

export type OnCompleteData = {
    login: {
        accessToken: string, refreshToken: string
    }
}

export type Props = {
   children: ReactNode
}
