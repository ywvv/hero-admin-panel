import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const [createHero, { isLoading, isError }] = useCreateHeroMutation();

  const { filtersLoadingStatus } = useSelector((state) => state.filters);
  const filters = selectAll(store.getState());

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuid(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    createHero(newHero).unwrap();

    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
  };

  const renderFilters = (filters) => {
    if (isLoading) {
      return <option>Loading Items</option>;
    } else if (isError) {
      return <option>Loading error</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name of the new hero
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="What is my name?"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Description
        </label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="What can I do?"
          style={{ height: "130px" }}
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Select hero element
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={heroElement}
          onChange={(e) => setHeroElement(e.target.value)}
        >
          <option>I own the element...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
