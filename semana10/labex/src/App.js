import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminHome from './pages/AdminHome'
import ApplicationForm from './pages/ApplicationForm'
import CreateTrip from './pages/CreateTrip'
import Home from './pages/Home'
import ListTrips from './pages/ListTrips'
import Login from './pages/Login'
import TripDetails from './pages/TripDetails'
import { GlobalBox } from './styled'
import { goToAdminHome, goToApplicationForm, goToCreateTrip, goToHome, goToListTrips, goToLogout } from './routes/coordinator'


export default function App() {
  return (
    <GlobalBox>
      <BrowserRouter>

        <Switch>

          <Route exact path="/">
            <Header 
            b1={{name: "Viagens", function: goToListTrips}}
            b2={{name: "Admin", function: goToAdminHome}}/>
            <Home/>
          </Route>

          <Route exact path="/trips/list">
            <Header 
            b1={{name: "Voltar", function: goToHome}}
            b2={{name: "Inscrever-se", function: goToApplicationForm}}/>
            <ListTrips/>
          </Route>

          <Route exact path="/trips/application">
            <Header 
            b1={{name: "Voltar", function: goToListTrips}}/>
            <ApplicationForm/>
          </Route>

          <Route exact path="/login">
          <Header 
            b1={{name: "Voltar", function: goToHome}}/>
            <Login/>
          </Route>

          <Route exact path="/admin/trips/list">
          <Header 
            b1={{name: "Voltar", function: goToHome}}
            b2={{name: "Criar Viagem", function: goToCreateTrip}}
            b3={{name: "Logout", function: goToLogout}}/>
            <AdminHome/>
          </Route>

          <Route exact path="/admin/trips/create">
            <Header 
            b1={{name: "Voltar", function: goToAdminHome}}/>
            <CreateTrip/>
          </Route>

          <Route exact path="/admin/trips/:id">
            <Header 
            b1={{name: "Voltar", function: goToAdminHome}}/>
            <TripDetails/>
          </Route>

          <Route>
            <h1>404 - Página Não Encontrada</h1>
          </Route>

        </Switch>

      <Footer/>
      </BrowserRouter>
    </GlobalBox>
  )
}
