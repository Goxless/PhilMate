import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {OfficePage} from './pages/OfficePage';
import {AuthPage} from './pages/AuthPage';
import {RegPage} from './pages/RegPage';
import {SettingsPage} from './pages/SettingsPage';


export const useRoutes = isAuthenticated =>{

    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/office" exact>
                    <OfficePage/>
                </Route>

                <Route path="/settings" exact>
                    <SettingsPage/>
                </Route>


            
            </Switch>
        )

    }

    return(
        <Switch>
            <Route path="/auth" exact>
                <AuthPage/>
            </Route>
            <Route path="/register" exact>
                <RegPage/>
            </Route>

            
        </Switch>
    )

}
