import { useHistory } from 'react-router'
import { HeaderBox, Logo, NavButtons } from '../styled'
export default function Header(props) {
    const history = useHistory()

    return (
        <HeaderBox>
            <Logo>
                <img src="https://lh3.googleusercontent.com/proxy/OhgcB4l5t6xn_3IZ_Ia60iDbEQAJwBsMYWD_AKDZy6xNvrj36TKXewNiCTnMAvJfDM12AQUJTg7R9q_9wgbEZ8u6hUhkKstoTUVOEKY_6jMY" alt="logo"/><h1>LabeX</h1>
            </Logo>
            <NavButtons>
                {props.b1 && <button onClick={() => props.b1.function(history)}>{props.b1.name}</button>}
                {props.b2 && <button onClick={() => props.b2.function(history)}>{props.b2.name}</button>}
                {props.b3 && <button onClick={() => props.b3.function(history)}>{props.b3.name}</button>}
            </NavButtons>
        </HeaderBox>
    )
}