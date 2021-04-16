export default function Candidates(props) {

    return (
        <section>
            <h1>Candidatos Pendentes</h1>
            {props.candidates.map((candidate) => {
                return  <div key={candidate.id}>
                            <p><b>Nome: </b>{candidate.name}</p>
                            <p><b>Idade: </b>{candidate.age}</p>
                            <p><b>Profissão: </b>{candidate.profession}</p>
                            <p><b>País </b>{candidate.country}</p>
                            <p><b>Texto de Candidatura: </b>{candidate.applicationText}</p>
                            <button onClick={() => props.decideCandidate(true, candidate.id)}>Aprovar</button>
                            <button onClick={() => props.decideCandidate(false, candidate.id)}>Reprovar</button><hr/>
                        </div>
            })}
        </section>)
}