export const fetchUrl = async (url: string | URL | Request) => {
	const response = await fetch(url);
	return response.json();
}