export default function ProfileCard({name, major='AI', interests = []}) {
    return (
        <section classNmae='card'>
            <h2>{name}</h2>
            <p>전공 :{major}</p>
            <ul>
                {interests.map((it, idx) => (<li key = {idx}>{it}</li>))}
            </ul>
        </section>
    );
}