import { CandidateCard, CandidatesBox, DecideCandidate } from "../styled"

export default function Candidates(props) {

    return (
        <CandidatesBox>
            <h1>Candidatos Pendentes</h1>
            {props.candidates.map((candidate) => {
                return  <CandidateCard key={candidate.id}>
                            <p><b>Nome: </b>{candidate.name}</p>
                            <p><b>Idade: </b>{candidate.age}</p>
                            <p><b>Profissão: </b>{candidate.profession}</p>
                            <p><b>País </b>{candidate.country}</p>
                            <p><b>Texto de Candidatura: </b>{candidate.applicationText}</p>
                            <DecideCandidate>
                                <button onClick={() => props.decideCandidate(true, candidate.id)}>Aprovar</button>
                                <button onClick={() => props.decideCandidate(false, candidate.id)}>Reprovar</button>
                            </DecideCandidate>
                        </CandidateCard>
            })}
            {props.candidates.length === 0 && <h2>Nenhum</h2>}
        </CandidatesBox>)
}