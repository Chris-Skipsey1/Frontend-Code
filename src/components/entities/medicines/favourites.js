import { createContext, useState } from "react";


const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteExercise) => {},
    removeFavorite: (exerciseId) => {},
    itemIsFavorite: (exerciseId) => {}
});

export function FavoritesContextProvider(props) {
    const [clientFavorites, setClientFavorites] = useState([]);
    
    function addFavoriteHandler(favoriteExercise) {
        setClientFavorites((prevClientFavorities) => {
            return prevClientFavorities.concat(favoriteExercise);
        });
    }

    function removeFavoriteHandler(exerciseId) {
        setClientFavorites(prevClientFavorities => {
            return prevClientFavorities.filter(exercise => exercise.id !== exerciseId);
        });
    }
    
    function itemIsFavoriteHandler(exerciseId) {
        return clientFavorites.some(exercise => exercise.id === exerciseId);
    }
    
    const context = {
        favorites: clientFavorites,
        totalFavorites: clientFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };


    return (
    <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
    );
}
export default FavoritesContext;