import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAdminAuthenticated } from './function'

export const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                const auth = isAdminAuthenticated()
                if (auth) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/admin",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}