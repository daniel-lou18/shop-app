import { HttpError } from "./HttpError";

class NextApiClient {
  constructor(public API_BASE_URL: string) {}

  private async request<T>(url: string, options?: {}): Promise<T> {
    const res = await fetch(`${this.API_BASE_URL}${url}`, options);

    if (!res.ok) {
      throw new HttpError(res.status, await res.json());
    }

    return res.json();
  }

  get<T>(url: string) {
    return this.request<T>(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const nextApiClient = new NextApiClient("/api");
