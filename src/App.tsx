import { useState, useMemo } from "react";
import { AutoComplete, Input } from "antd";
import { Col, Row, Pagination, Spin } from "antd";
import { usePokemons, usePokemon, pageSize } from "./network/index";
import Preview from "./components/Preview";
import PokemonDetail from "./components/PokemonDetail";
import Pokemon from "./interfaces/Pokemon.interface";
import PokemonItem from "./interfaces/PokemonItem.interface";
import SummaryTable from "./components/SummaryTable";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [bufferText, setBufferText] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  const [page, setPage] = useState<number>(0);
  const pokemonsRequest = usePokemons(page);

  const pokemonRequest = usePokemon();

  const filteredPokemons = useMemo(
    () =>
      pokemonsRequest.data?.results?.filter((item) =>
        item.name.toLowerCase().includes(searchText?.toLowerCase())
      ),
    [searchText, pokemonsRequest]
  );

  const inputOptions = useMemo(() => {
    const options = pokemonsRequest.data?.results?.map((item) => ({
      value: item.name,
    }));
    return options || [];
  }, [pokemonsRequest.data]);

  const onPokemonClick = async (item: PokemonItem) => {
    const result = await pokemonRequest.mutate(item);
    setSelectedPokemon(result);
  };

  const onChangePage = (page: number) => {
    setSelectedPokemon(undefined);
    setPage(page);
  };

  const isLoading = pokemonRequest.isLoading || pokemonsRequest.isLoading;

  return (
    <div>
      <div className="banner">
        <div>
          <h1 className="banner__title">Buscar por nombre</h1>
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{
              width: 300,
              marginRight: 10,
            }}
            options={inputOptions}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={setBufferText}
            onSelect={(value) => setSearchText(value)}
          >
            <Input.Search
              size="large"
              placeholder="Busca tu pokemon..."
              enterButton
              onSearch={() => setSearchText(bufferText)}
            />
          </AutoComplete>
          {isLoading && <Spin size="large" />}
          <p style={{ color: "#fff" }}>
            * Busqueda basada en los registros de pagina actual
          </p>
        </div>
      </div>

      <div style={{ padding: 10 }}>
        {filteredPokemons?.length === 0 && <p>No se encontraron pokemones</p>}

        <Row>
          <Col
            md={selectedPokemon ? 18 : 24}
            xs={selectedPokemon ? 0 : 24}
            style={{
              padding: 10,
              transition: "all 0.5s ease",
            }}
          >
            <Row style={{ marginBottom: 20 }} gutter={{ md: 40, xs: 20 }}>
              {filteredPokemons?.map((item) => (
                <Col style={{ marginBottom: 30 }} key={item.url} md={4} xs={12}>
                  <Preview
                    name={item.name}
                    onClick={() => onPokemonClick(item)}
                  />
                </Col>
              ))}
            </Row>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                current={page}
                onChange={onChangePage}
                total={pokemonsRequest.data?.count! - pageSize}
                showSizeChanger={false}
                pageSize={pageSize}
              />
            </div>
          </Col>

          {selectedPokemon && (
            <Col md={6} xs={24} className="pokemon__details">
              <PokemonDetail
                details={selectedPokemon!}
                onClose={() => setSelectedPokemon(undefined)}
              />
            </Col>
          )}
        </Row>

        <SummaryTable data={pokemonsRequest.data?.results || []} />
      </div>
    </div>
  );
}

export default App;
