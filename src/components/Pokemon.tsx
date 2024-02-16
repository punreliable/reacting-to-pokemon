export function Pokemon({name, id}: {name: string, id: number}) {
	return (
		<li>
			id: {id} - {name}
		</li>
	);
}
