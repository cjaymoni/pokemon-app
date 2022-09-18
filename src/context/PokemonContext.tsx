import React from "react";
import api from "../utils/api";
import { IInitialData, IPokemonData } from "../interfaces/all-models";

const PokemonContext = React.createContext({});
const PokemonProvider = ({ children }: any) => {
  const [pokemonData, setPokemonData] = React.useState<IPokemonData[]>([]);

  const fetchListing = async () => {
    await api
      .get("/pokemon?limit=50&offset=0")
      .then(function (response) {
        const res = response.data.results;
        return res.forEach((element: IInitialData) => {
          fetchPokemonData(element);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  function fetchPokemonData(pokemon: any) {
    let url = pokemon.url;
    api.get(url).then((res: any) => {
      setPokemonData((pokeData: IPokemonData[]) => [...pokeData, res.data]);
      // setTotalRecords(listData.length);
      //   setPokemonData([...pokemonData, res.data]);
    });
  }

  const clearPokemonData = () => {
    setPokemonData([]);
  };
  //   useEffect(() => {
  //     fetchListing();
  //   }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemonData, fetchListing, clearPokemonData }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

const withPokemon = (Child: any) => (props: any) =>
  (
    <PokemonContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </PokemonContext.Consumer>
  );

export { PokemonProvider, withPokemon };
