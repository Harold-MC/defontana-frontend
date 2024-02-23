import { useEffect, useState } from "react";
import PagedList from "../interfaces/PagedList.interface";
import PokemonItem from "../interfaces/PokemonItem.interface";
import http from "./http";
import { AxiosResponse } from "axios";

export const pageSize = 18;

// TODO: podemos crear un boilerplate o utilizar una libreria como react query
export const usePokemons = (page: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PagedList<PokemonItem>>();

  useEffect(() => {
    setIsLoading(true);
    http
      .get("/v2/pokemon", {
        params: { offset: page * pageSize, limit: pageSize },
      })
      .then((response: AxiosResponse<PagedList<PokemonItem>>) =>
        setData(response.data)
      )
      .finally(() => setIsLoading(false));
  }, [page]);

  return { isLoading, data };
};

export const usePokemon = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    mutate: async (item: PokemonItem) => {
      setIsLoading(true);
      const result = await http.get(`/v2/pokemon/${item.name}`);
      setIsLoading(false);
      return result.data;
    },
    isLoading,
  };
};
