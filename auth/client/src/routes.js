import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {OfficePage} from './pages/OfficePage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = isAuthenticated =>{

    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/office" exact>
                    <OfficePage />
                </Route>

                <Redirect to="/auth"/>
            </Switch>
        )

    }

    return(
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>

            <Redirect to ="/"/>
        </Switch>
    )

}
