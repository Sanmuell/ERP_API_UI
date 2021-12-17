import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import Empresa from './pages/Empresa';
import Fornecedor from './pages/Fornecedor';

class Headers extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid-center">
                    <div class="collapse navbar-collapse" >
                        <ul class="navbar-nav">
                            <li class="nav-item1">
                                <a class="nav-link" href="/main"  >Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/empresa">Empresas</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href='fornecedor'>Fornecedores</a>
                            </li>

                        </ul>



                    </div>
                </div>
            </nav>
        );
    }

}

export default Headers;