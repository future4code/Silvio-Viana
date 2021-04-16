import styled from 'styled-components'

export const GlobalBox = styled.div`
overflow-x: hidden;`
export const HomeBox = styled.div`
min-height: 75vh;
text-align: center;

h2 {
    margin: 150px 0px 0px 0px;
}`

export const TripsBox = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;`

export const TripCard = styled.div`
border: 1px solid black;
padding: 10px 15px;
margin: 10px;
width: 350px;
min-height: 200px;`

export const CandidateFormBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 20px 0px;`

export const CandidateFormCard = styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid black;
width: 420px;
padding: 10px;
margin: 0;

h3 {
    font-size: 20px;
    margin: 0;
}
input , select {
    width: 300px;
    margin: 0px 0px 20px 0px;
}

button {
    width: 300px;
}`

export const LoginFormBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
min-height: 78.5vh;`

export const LoginFormCard = styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid black;
width: 420px;
padding: 30px 10px;
margin: 0;

h3 {
    font-size: 20px;
    margin: 0;
}
input {
    width: 300px;
    margin: 0px 0px 20px 0px;
}

button {
    width: 300px;
}`

export const AdminTripBox = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
min-height: 70vh;`

export const AdminTripCard = styled.div`
border: 1px solid black;
margin: 10px;
padding: 10px;
width: 600px;
display: flex;
justify-content: space-between;
align-items: center;
height: 100px;

button {
    width: 100px;
    font-size: 24px;
}`

export const TripDetailsBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

export const CandidatesBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

export const CandidateCard = styled.div`
border: 1px solid black;
padding: 20px;
margin: 10px;
width: 350px;
height: 300x;`

export const DecideCandidate = styled.div`
display: flex;
justify-content: space-between;

button {
    width: 45%;
    heigth: 200px;
}`

export const ApprovedBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 400px;
margin: 20px;`

export const ApprovedCard = styled.h2`
padding: 20px;
width: 350px;
display: flex;
justify-content: center;
border: 1px solid black;`

export const CreateFormBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 0px 20px 0px;
min-height: 75vh;`

export const CreateFormCard = styled.form`
display: flex;
flex-direction: column;
align-items: center;
border: 1px solid black;
width: 420px;
padding: 10px;
margin: 0;

h3 {
    font-size: 20px;
    margin: 0;
}
input , select {
    width: 300px;
    margin: 0px 0px 20px 0px;
}

button {
    width: 300px;
}`

export const HeaderBox = styled.header`
margin: 0;
padding: 10px;
background-color green;
color: white;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
border-bottom: 2px solid black;
`

export const Logo = styled.div`
display: flex;
img {
    height: 60x;
    width: 70px;
}`

export const NavButtons = styled.div`
button {
    font-size: 25px;
    padding: 10px;
    margin: 0px 10px;
    width: 200px;
}
`

export const FooterBox = styled.header`
margin: 0;
padding: 0px;
background-color green;
color: white;
display: flex;
justify-content: center;
border-top: 1px solid black;
`

export const PageTitle = styled.h1`
width: 100vw;
text-align: center`