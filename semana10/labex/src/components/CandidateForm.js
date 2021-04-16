import { listaPaises } from "../parameters"
import { CandidateFormCard } from "../styled"

export default function CandidateForm(props) {

    return (
        <CandidateFormCard onSubmit={props.applyToTrip}>
            
            <h3>Viagem</h3>
            <select value={props.tripValue} onChange={props.onChangeTrip} required >
                <option id=""></option>
                {props.trips.map((trip) => {
                    return <option key={trip.id} id={trip.id}>{trip.name}</option>
                })}
            </select>

            <h3>Nome</h3>
            <input name="name" type="text" value ={props.form.name} onChange={props.onChange} pattern="[A-Za-z ]{3,}" required />
            
            <h3>Idade</h3>
            <input name="age" type="number" min="18" value ={props.form.age} onChange={props.onChange} required />
            
            <h3>Texto de Candidatura</h3>
            <input name="applicationText" type="text" value ={props.form.applicationText} onChange={props.onChange} pattern="[A-Za-z0-9 ]{30,}" required />
            
            <h3>Profissão</h3>
            <input name="profession" type="text" value ={props.form.profession} onChange={props.onChange} pattern="[A-Za-z0-9 ]{10,}" required />
            
            <h3>País</h3>
            <select name="country" value={props.form.country} onChange={props.onChange} required>
                <option></option>
                {listaPaises.map((nacao) => {
                    return <option key={nacao.ordem}>{nacao.nome}</option>
                })}
            </select>
            
            <button>Enviar</button>
        </CandidateFormCard>)
}