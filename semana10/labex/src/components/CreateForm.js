import { CreateFormCard } from "../styled";

export default function CreateForm(props) {

    return (
        <CreateFormCard onSubmit={props.createTrip}>

            <h3>Planeta</h3>
            <select name="planet" value={props.form.planet} onChange={props.onChange} required >
                <option></option>
                <option>Lua</option>
                <option>Sol</option>
            </select>

            <h3>Nome da Viagem</h3>
            <input name="name" type="text" value={props.form.name} onChange={props.onChange} pattern="[a-zA-Z0-9 ]{5,}" required />
            
            <h3>Descrição</h3>
            <input name="description" type="text" value={props.form.description} onChange={props.onChange} pattern="[a-zA-Z0-9 ]{30,}" required />
            
            <h3>Data</h3>
            <input name="date" type="date" min="2022-01-01" value={props.form.date} onChange={props.onChange} required />
            
            <h3>Duração em Dias</h3>
            <input name="durationInDays" type="number" min="50" value={props.form.durationInDays} onChange={props.onChange} required />
            
            <button>Criar</button>
        </CreateFormCard>)
}