import styled from 'styled-components'

export const DivGlobal = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 10px;`

export const CardInicial = styled.div`
border: 2px solid black;
width: 36vw;
padding: 2px;
height: 95vh;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
text-align: center;`

export const ImagemInicial = styled.img`
height: 60%;
width: 70%;`

export const Botões = styled.div`
width: 100%;
display: flex;
justify-content: space-between;`
export const Botão = styled.button`
font-size: 25px;
width: 50%;`

export const CardMatches = styled.div`
border: 2px solid black;
width: 36vw;
padding: 2px;
min-height: 95vh;
`

export const Match = styled.div`
display: flex;
align-items: center;
margin: 0px 10px;
img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    margin: 0px 10px 0px 0px;
}`

export const BotõesPágina = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
button {
    width: 150px;
    font-size: 18px;
}
`

export const Aviso = styled.div`
width: 100%;
text-align: center;`
