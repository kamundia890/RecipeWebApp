import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';
import style from './recipe.module.css'

const App = () => {
  const APP_ID = 'ce2d11dd';
  const APP_KEY = 'a6a29c736b7c5d0dd4da5ad0bdc2654d'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  
  useEffect(() =>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
  const data = await response.json();
  setRecipes(data.hits);
  };
  const updatesearch = e => {
    setSearch(e.target.value);
  }
  const getsearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
   <div className="App">
     <form onSubmit={getsearch} className="search-form">
       <input className="search-bar" type="text" value={search} onChange={updatesearch}/>
  <button  className="search-button" type="submit">Search</button>
     </form>
     <div className="recipes">
     {recipes.map(recipe => (
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label}
       calories={recipe.recipe.calories}
       image={recipe.recipe.image} 
       ingredients={recipe.recipe.ingredients}/>
     ))}
     </div>
   </div>
  );
};
export default App;
