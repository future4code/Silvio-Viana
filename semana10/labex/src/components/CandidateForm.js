import { listaPaises } from "../parameters"

export default function CandidateForm(props) {

    return (
        <form onSubmit={props.applyToTrip}>
            <select value={props.tripValue} onChange={props.onChangeTrip} required >
                <option id=""></option>
                {props.trips.map((trip) => {
                    return <option key={trip.id} id={trip.id}>{trip.name}</option>
                })}
            </select>

            <input name="name" type="text" value ={props.form.name} onChange={props.onChange} placeholder="Nome" pattern="[A-Za-z ]{3,}" required />
            <input name="age" type="number" min="18" value ={props.form.age} onChange={props.onChange} placeholder="Idade" required />
            <input name="applicationText" type="text" value ={props.form.applicationText} onChange={props.onChange} placeholder="Texto de Candidatura" pattern="[A-Za-z0-9 ]{30,}" required />
            <input name="profession" type="text" value ={props.form.profession} onChange={props.onChange} placeholder="Profissão" pattern="[A-Za-z0-9 ]{10,}" required />

            <select name="country" onChange={props.onChange} value={props.form.country} required>
                <option></option>
                {listaPaises.map((nacao) => {
                    return <option key={nacao.ordem}>{nacao.nome}</option>
                })}
            </select>
            <button>Enviar</button>
        </form>)
}