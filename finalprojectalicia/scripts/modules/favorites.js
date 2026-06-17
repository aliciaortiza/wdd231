/*Favorites Module - Local Storage management*/
const STORAGE_KEY = 'humoysabor_favorites';

export function getFavorites() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error reading localStorage data', e);
        return [];
    }
}

export function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error('Error writing to localStorage', e);
    }
}

export function toggleFavorite(productId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index === -1) {
        favorites.push(productId);
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites(favorites);
    updateFavCountUI();
    return favorites.includes(productId);
}

export function updateFavCountUI() {
    const counterElement = document.getElementById('fav-count');
    if (counterElement) {
        const favorites = getFavorites();
        counterElement.textContent = favorites.length;
    }
}