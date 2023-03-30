import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";



ReactDOM.render(
         <BrowserRouter>
            <Routes>
                <Route path="*" element={ <App /> }>
                </Route>
               
            </Routes>
        </BrowserRouter>
    ,
    document.getElementById('root')
);