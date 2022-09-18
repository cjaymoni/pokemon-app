import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPokemonData } from "../../interfaces/all-models";
import api from "../../utils/api";

function DetailsPage(props: any) {
  const param = useParams();
  const pokemonName = param.pokemonName;
  const [pokemonDetails, setPokemonDetails] = React.useState<any>({});
  const [pokemonImages, setPokemonImages] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const navigator = useNavigate();

  const fetchPokemonDetails = async () => {
    await api.get(`/pokemon/${pokemonName}`).then((res) => {
      return setPokemonDetails(res.data), populateImages(res.data.sprites);
    });
  };
  let count = 0;
  const handleOnNextClick = () => {
    count = (count + 1) % 4;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const imgsLength = 4;
    count = (currentIndex + imgsLength - 1) % imgsLength;
    setCurrentIndex(count);
  };

  const startSlider = () => {
    setInterval(() => {
      handleOnNextClick();
    }, 2000);
  };

  const populateImages = (data: any) => {
    const images = data;
    const imagesArray = [];
    for (const [key, value] of Object.entries(images)) {
      if (value !== null && typeof value !== "object") {
        imagesArray.push(value);
      }
      setPokemonImages(imagesArray);
    }
  };
  useEffect(() => {
    fetchPokemonDetails();
    startSlider();
  }, []);

  const goBack = () => {
    navigator(-1);
  };
  return (
    <div className="py-39">
      <div className="h-full m-10 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-2xl">
        <div className="text-gray-600 body-font">
          <div className="container px-3 py-18 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <h2 className="text-center capitalize font-semibold py-8 text-xl ">
                {pokemonDetails.name} Info
              </h2>
              <div className="max-w-screen-xl m-auto rounded-lg h-39 border border-solid  border-slate-800 mb-9">
                <div className="w-full relative select-none ">
                  <div className="aspect-w-16 aspect-h-4">
                    <img
                      src={pokemonImages[currentIndex]}
                      alt=""
                      className="object-contain  h-full w-full"
                    />
                  </div>

                  <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                    <ChevronLeftIcon
                      onClick={handleOnPrevClick}
                      className="h-7 w-7 cursor-pointer border border-solid  border-slate-800 rounded-full"
                      aria-hidden="true"
                    />
                    <ChevronRightIcon
                      onClick={handleOnNextClick}
                      className="h-7 w-7 cursor-pointer  border border-solid  border-slate-800 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <img
                      alt="content"
                      className="w-full h-full"
                      src={pokemonDetails.sprites?.front_default}
                    />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-bold title-font mt-4 text-gray-900 text-lg capitalize ">
                      {pokemonDetails?.name}
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

                    <div className="bg-slate-200 rounded-lg p-3 w-full">
                      <div className="flex flex-wrap justify-between text-base font-semibold">
                        <span>Species</span>
                        <span className="capitalize">
                          {pokemonDetails.species?.name}
                        </span>
                      </div>
                      <div className="flex flex-wrap justify-between text-base font-semibold">
                        <span>Base-Xp</span>
                        <span>{pokemonDetails.base_experience}</span>
                      </div>
                      <div className="flex flex-wrap justify-between text-base font-semibold">
                        <span>Height</span>
                        <span>{pokemonDetails.height}</span>
                      </div>
                      <div className="flex flex-wrap justify-between text-base font-semibold">
                        <span>Weight</span>
                        <span>{pokemonDetails.weight}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div>
                    <h2 className="text-lg font-bold flex ">Types</h2>
                    <div role="list" className="flex flex-wrap mb-4 mt-3">
                      {pokemonDetails.types?.map((type: any, index: number) => (
                        <span
                          key={index}
                          role="listitem"
                          className="mr-3 mb-5 text-sm bg-green-200 text-gray-800 px-3 py-1 rounded-full text-center capitalize font-semibold"
                        >
                          {type.type?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Moves</h2>
                    <div role="list" className="flex flex-wrap mb-4 mt-3">
                      {pokemonDetails.moves
                        ?.slice(0, 15)
                        ?.map((move: any, index: number) => (
                          <span
                            key={index}
                            role="listitem"
                            className="mr-3 mb-5 text-sm bg-red-200 text-gray-800 px-3 py-1 rounded-full text-center capitalize font-semibold"
                          >
                            {move.move?.name}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Base Stats</h2>
                    <div role="list" className="mb-4 mt-3 grid grid-cols-3">
                      {pokemonDetails.stats?.map((stat: any, index: number) => (
                        <div
                          key={index}
                          role="listitem"
                          className="flex flex-col justify-center bg-orange-200 px-2 py-1 shadow  text-center rounded-lg mb-3 w-3/4"
                        >
                          <p className="text-sm font-bold capitalize">
                            {stat.stat?.name}
                          </p>
                          <p className="text-lg mt-2 text-gray-800 font-semibold">
                            {stat.base_stat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end mt-10 mb-8">
                    <button
                      className="bg-indigo-300 p-2 rounded-lg font-semibold inline-flex items-center"
                      onClick={goBack}
                    >
                      <ArrowLongLeftIcon
                        onClick={handleOnNextClick}
                        className="h-7 w-7 cursor-pointer  border border-solid  border-slate-800 rounded-full mx-3"
                      />
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
