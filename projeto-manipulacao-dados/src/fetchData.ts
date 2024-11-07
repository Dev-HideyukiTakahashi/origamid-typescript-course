export default async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url); // retorna a response HTTP
    if (!response.ok) throw new Error("Erro : " + response.status); // erro se não for cód 200 - OK

    const json = await response.json(); // salvando o json na variavel
    return json;
  } catch (error) {
    if (error instanceof Error) console.error("fetchData : " + error.message);
    return null;
  }
}