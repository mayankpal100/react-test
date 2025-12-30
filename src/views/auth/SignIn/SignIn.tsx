import SignInForm from './SignInForm'
import {useParams} from "react-router-dom";
import {signInSuccess, signOutSuccess, useAppDispatch} from "@/store";
import {setSourceId, useAppSelector} from "@/views/sales/Vendor/store";
import {useEffect} from "react";
import isEmpty from "lodash/isEmpty";

const SignIn = () => {
    const { sourceId  } = useParams()

    const dispatch = useAppDispatch()

    // const source = useAppSelector(
    //     (state) => state.vendorData.data.sourceId
    // )
    useEffect(() => {

        if(sourceId != null){
                dispatch(signInSuccess(sourceId))
        }
    }, [sourceId]);

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome back!</h3>
                <p>Please enter your credentials to sign in!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
