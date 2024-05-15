export function handleFetchError(
  error: unknown,
  fallbackMessage?: string
): { success: false; error: string } {
  console.error(error);
  if (error instanceof Error) return { success: false, error: error.message };
  else
    return {
      success: false,
      error: fallbackMessage || "Une erreur est survenue",
    };
}
