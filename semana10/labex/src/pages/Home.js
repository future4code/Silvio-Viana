import { useHistory } from 'react-router-dom'
import { goToAdminHome, goToListTrips } from '../routes/coordinator'
import { HomeBox, PageTitle } from '../styled'


export default function Home() {

    const history = useHistory()
    
    return (
        <HomeBox>
            <PageTitle>Home</PageTitle>
            <h2>Bem-Vindo a LabeX, temos viagens a todos os locais do Sistema Solar</h2>
        </HomeBox>
    )
}