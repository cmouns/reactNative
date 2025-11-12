import { Product } from "@/type";
const API_URL = 'https://fakestoreapi.com';
// Récupère la liste des produits depuis l'API Fakestore
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
