import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Empresa from './pages/Empresa';
import Fornecedor from './pages/Fornecedor';



function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/main" exact component={Main} />
                <Route path="/empresa" exact component={Empresa} />
                <Route path="/fornecedor" exact component={Fornecedor} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;