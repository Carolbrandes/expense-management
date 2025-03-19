const API_URL = "https://economia.awesomeapi.com.br/json/available";

export async function fetchCurrencies(): Promise<{ name: string; acronym: string }[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro ao buscar moedas");
        }

        const data: Record<string, string> = await response.json();

        const currencies = new Map<string, string>();

        Object.entries(data).forEach(([acronymPair, namePair]) => {
            const [acronym] = acronymPair.split("-"); // We only get the currency code (ex: "USD" from "USD-BRL")
            const name = namePair.split("/")[0]; // We just take the name of the currency

            if (!currencies.has(acronym)) {
                currencies.set(acronym, name);
            }
        });

        // Convert the Map to an array of objects
        return Array.from(currencies, ([acronym, name]) => ({ name, acronym }));
    } catch (error) {
        console.error("🚀 ~ fetchCurrencies ~ error:", error);
        return [];
    }
}