import axios from "axios";
import dotenv from "dotenv";
import { SearchResult } from "../../src/lib/entities";

dotenv.config();

interface SearchOptions {
  tbs?: string;
  filter?: string;
  lang?: string;
  country?: string;
  location?: string;
  num_results: number;
  page?: number;
}

export async function searxng_search(
  q: string,
  options: SearchOptions,
): Promise<SearchResult[]> {
  const params = {
    q: q,
    hl: options.lang,
    gl: options.country,
    location: options.location,
    num: options.num_results,
    page: options.page ?? 1,
    format: "json"
  };

  const url = process.env.SEARXNG_ENDPOINT as string;
  if (!url) {
    console.error(`SEARXNG_ENDPOINT environment variable is not set`);
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    });

    const data = response.data;

    if (data && Array.isArray(data.results)) {
      return data.results.map((a: any) => ({
        url: a.url,
        title: a.title,
        description: a.content,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error(`There was an error searching for content: ${error.message}`);
    return [];
  }
}
