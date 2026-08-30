export type OperatingPrincipleData = {
  number: string;
  title: string;
  body: string;
};

export function OperatingPrinciple({
  principle,
}: {
  principle: OperatingPrincipleData;
}) {
  return (
    <li className="operating-principle">
      <span className="operating-principle__rule" aria-hidden="true" />
      <span className="operating-principle__number">{principle.number}</span>
      <h3>{principle.title}</h3>
      <p>{principle.body}</p>
    </li>
  );
}
