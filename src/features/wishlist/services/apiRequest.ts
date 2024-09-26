export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} - ${response.statusText}. ${data?.message}`
      );
    }

    return data;
  } catch (err: unknown) {
    console.error(err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Une erreur est survenue lors de la récupération de la liste de souhaits"
    );
  }
}
