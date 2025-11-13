import { Product } from "@/type";
const API_URL = 'https://fakestoreapi.com';
// Récupère la liste des produits depuis l'API Fakestore
// La promesse permet de s'assurer que le type retourné est bien une liste de produits
const getProducts = async () : Promise<Product[]> => {
    try {
        const response = await fetch(`${API_URL}/products`)
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.log('Error fetching products', error);
        throw error;
    };
};

// Récupère la liste des catégories de produits depuis l'API Fakestore
// La promesse permet de s'assurer que le type retourné est bien une liste de chaînes de caractères
const getCategories = async () : Promise<string[]> => {
    try {
        const response = await fetch(`${API_URL}/products/categories`)
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.log('Error fetching categories', error);
        throw error;
    };
}

export { getProducts, getCategories };