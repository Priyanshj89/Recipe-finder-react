import React,{ useEffect , useState } from "react";
import "./App.css";
import Recipe from './Recipe';

const App = () =>{

  const APP_ID = '5bf7be5e';
  const APP_KEY = 'bef5f4abc352092e0f85a32dfa279661';

  /*
  - useEffect is rendered at the beginning of your program
  - if second parameter, empty brackets [], runs only once else everytime re-rendered
  - you can put a parameter like [counter] as second parameter and it will re-render
  only when there is state change in counter
  */ 

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(()=>{
    getRecipes(); //making API request as soon as web-app rendered
  }, [query]);  //note the square brackets

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data =await response.json(); //requires time
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);

  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return(
    <div className = "App">
      <form className = "search-form" onSubmit = {getSearch}>
        <input className = "search-bar" 
        type = "text" 
        placeholder = "Search Recipe" 
        value = {search}
        onChange = {updateSearch}
        />
        <button className = "search-button" type = "submit">Search</button>
      </form>
      <div className="rec">
      {recipes.map(recipe=>(     // round bracket as jsx is required
        <Recipe 
        key = {recipe.recipe.label} 
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
