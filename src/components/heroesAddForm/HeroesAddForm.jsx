import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../../actions";

const HeroesAddForm = () => {
  const [heroName, setHeroName] = useState("");
  const [heroDescr, setHeroDescr] = useState("");
  const [heroElement, setHeroElement] = useState("");

  const dispatch = useDispatch();
  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newHero = {
      id: uuid(),
      name: heroName,
      description: heroDescr,
      element: heroElement,
    };

    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then(() => dispatch(heroCreated(newHero)))
      .catch((err) => console.log(err));

    setHeroName("");
    setHeroDescr("");
    setHeroElement("");
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
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="wind">Wind</option>
          <option value="earth">Earth</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default HeroesAddForm;
