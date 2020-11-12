import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import PageNotFound from './PageNotFound';
import ManageCoursePage from './ManageCoursePage';
import AuthorsPage from './AuthorsPage';
import ManageAuthorPage from './ManageAuthorPage';

export default function App() {
    return (
        <div className='container-fluid'>
            <ToastContainer autoClose={3000} hideProgressBar />
            <Header />
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/courses' component={CoursesPage} />
                <Route path='/course/:slug' component={ManageCoursePage} />
                <Route path='/course' component={ManageCoursePage} />
                <Route path='/course/' component={PageNotFound} />
                <Route path='/authors' component={AuthorsPage} />
                <Route path='/author/:id' component={ManageAuthorPage} />
                <Route path='/author' component={ManageAuthorPage} />
                <Route path='/author/' component={PageNotFound} />
                <Redirect from='/about-page' to='/about' />
                <Route path='/404' component={PageNotFound} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
}
