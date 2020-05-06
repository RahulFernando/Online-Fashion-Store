import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isStoreManagerAuthenticated } from './function'

export const StoreManagerProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                const auth = isStoreManagerAuthenticated()
                if (auth) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/storeManager",
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