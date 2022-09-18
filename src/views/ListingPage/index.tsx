import React from "react";
import Pagination from "../../components/paginator";
import CardComponent from "../../components/card";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { withPokemon } from "../../context/PokemonContext";
import { IPokemonData } from "../../interfaces/all-models";

class ListingPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pokemonData: [],
      searchTerm: "",
      listData: [],
      currentPage: 1,
      recordsPerPage: 16,
      totalRecords: 0,
    };
  }
  componentDidMount(): void {
    this.props.fetchListing();
    this.setState({
      pokemonData: this.props.pokemonData,
      listData: this.props.pokemonData,
      totalRecords: this.props.pokemonData.length,
    });
  }

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    if (prevProps.pokemonData !== this.props.pokemonData) {
      this.setState({
        pokemonData: this.props.pokemonData,
        listData: this.props.pokemonData,
        totalRecords: this.props.pokemonData.length,
      });
    }
  }

  handleChange = (event: any, data: IPokemonData[]) => {
    this.setState({ searchTerm: event.target.value });
    if (this.state.searchTerm.length > 3) {
      const filterd = data.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase());
      });
      return this, this.setState({ listData: filterd });
    }
  };

  handleKeyDown = (event: any) => {
    if (event.key === "Backspace" && this.state.searchTerm.length < 4) {
      this.setState({ searchTerm: "" });
      this.props.clearPokemonData();
      this.props.fetchListing();
    }
  };
  resetData = () => {
    this.setState({ searchTerm: "" });
    this.props.clearPokemonData();
    this.props.fetchListing();
  };

  upDatePage = (page: number) => {
    this.setState({ currentPage: page });
  };

  render() {
    const indexOfLastRecord =
      this.state.currentPage * this.state.recordsPerPage;

    const indexOfFirstRecord = indexOfLastRecord - this.state.recordsPerPage;

    const currentRecords = this.state.listData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

    const numberOfPages = Math.ceil(
      this.state.listData.length / this.state.recordsPerPage
    );

    return (
      <div className="text-gray-600 body-font min-h-screen">
        <div>
          <h1 className="text-3xl text-red-500 text-center pt-10">Pokédex</h1>
          <p className="text-center mt-6 text-xl text-gray-700">
            The Pokédex contains detailed stats for every creature from the
            Pokemon games.
          </p>
        </div>

        <div>
          <form className="pt-2 relative mx-auto text-gray-600 w-1/2 mt-8">
            <input
              className="border-2 border-gray-300 bg-white h-12 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="searchTerm"
              placeholder="Search for Pokemons"
              id="searchTerm"
              value={this.state.searchTerm}
              onKeyDown={(e) => this.handleKeyDown(e)}
              onChange={(e) => this.handleChange(e, currentRecords)}
            />
            {this.state.searchTerm.length > 3 && (
              <div className="absolute right-0 top-1 mt-5 mr-10">
                <XMarkIcon
                  className="w-4 h-4 cursor-pointer text-cyan-600"
                  onClick={() => this.resetData()}
                />
              </div>
            )}
            <button type="submit" className="absolute right-0 top-1 mt-5 mr-4">
              <MagnifyingGlassIcon className="text-gray-600 h-4 w-4 fill-current" />
            </button>
          </form>
        </div>

        <div className="container px-2 py-24 mx-auto">
          <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {currentRecords.map((item: IPokemonData, index: number) => (
              <CardComponent key={index} data={item} index={index} />
            ))}
          </div>
          <Pagination
            nPages={numberOfPages}
            currentPage={this.state.currentPage}
            setCurrentPage={this.upDatePage}
            totalRecords={this.state.totalRecords}
            recordsPerPage={this.state.recordsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default withPokemon(ListingPage);
