import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CadastroPage from '../pages/CadastroPage'
import FeedPage from '../pages/FeedPage'
import LoginPage from '../pages/LoginPage'
import PostPage from '../pages/PostPage'

export default function Router() {
    return (<BrowserRouter>

        <Switch>

            <Route exact path="/">
                <FeedPage/>
            </Route>

            <Route exact path="/login">
                <LoginPage/>
            </Route>

            <Route exact path="/cadastro">
                <CadastroPage/>
            </Route>

            <Route exact path="/post/:id">
                <PostPage/>
            </Route>

            <Route>
                <h1>Error 404 - Página não encontrada</h1>
            </Route>

        </Switch>

    </BrowserRouter>)
}