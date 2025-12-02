import { useQuery } from "@tanstack/react-query";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface ApiResponse {
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const fetchCharacters = async (query: string, page: number): Promise<ApiResponse> => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${query}`)
  if (!res.ok) {
    throw new Error("No characters found")
  }
  return res.json()
}

export const useCharacters = (query: string, page: number) => {
  return useQuery<ApiResponse, Error>({
    queryKey: ["characters", query, page],
    queryFn: () => fetchCharacters(query, page),
  });
  /*
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}&name=${query}`
        );

        if (!response.ok) {
          throw new Error("No characters found");
        }

        const data: ApiResponse = await response.json();
        setCharacters(data.results);
        setPages(data.info.pages);
      } catch (err: any) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [query, page]);

  return { characters, loading, error, pages };*/
};
