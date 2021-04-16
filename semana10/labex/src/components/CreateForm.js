export default function CreateForm(props) {

    return (
        <form onSubmit={props.createTrip}>
            <select name="planet" value={props.form.planet} onChange={props.onChange} required >
                <option></option>
                <option>Lua</option>
                <option>Sol</option>
            </select>
            <input name="name" type="text" value={props.form.name} onChange={props.onChange} placeholder="Nome" pattern="[a-zA-Z0-9 ]{5,}" required />
            <input name="description" type="text" value={props.form.description} onChange={props.onChange} placeholder="Descrição" pattern="[a-zA-Z0-9 ]{30,}" required />
            <input name="date" type="date" min="2022-01-01" value={props.form.date} onChange={props.onChange} placeholder="Data" required />
            <input name="durationInDays" type="number" min="50" value={props.form.durationInDays} onChange={props.onChange} placeholder="Duração em Dias" required />
            <button>Criar</button>
        </form>)
}