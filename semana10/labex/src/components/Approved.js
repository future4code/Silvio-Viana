import { ApprovedBox, ApprovedCard } from "../styled"

export default function Approved(props) {

    return (
        <ApprovedBox>
            <h1>Candidatos Aprovados</h1>
            {props.approved.map((candidate) => {
                return <ApprovedCard>{candidate.name}</ApprovedCard>
            })}
            {props.approved.length === 0 && <h2>Nenhum</h2>}
        </ApprovedBox>)
}