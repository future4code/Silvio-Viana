export default function Approved(props) {

    return (
        <section>
            <h1>Candidatos Aprovados</h1>
            {props.approved.map((candidate) => {
                return <h1>{candidate.name}</h1>
            })}
        </section>)
}