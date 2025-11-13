// Import des fonctions API pour récupérer les produits et les catégories
import { getCategories, getProducts } from '@/lib/api';
// Import du type Product pour typer les produits dans le store
import { Product } from '@/type';
// Import d'AsyncStorage pour la persistance des données
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import des fonctions de Zustand pour créer le store avec persistance
import { create } from 'zustand';
// Import des fonctions de middleware pour la persistance en JSON
import { createJSONStorage, persist} from 'zustand/middleware';

// Définition de l'interface pour le state du store des produits
interface ProductsState { 
  products: Product[]; // Liste complète des produits
  filteredProducts: Product[]; // Liste des produits filtrés
  categories: string[]; // Liste des catégories de produits
  loading: boolean; // Indique si les données sont en cours de chargement
  error: string | null; // Message d'erreur en cas de problème lors du chargement
  fetchProducts: () => Promise<void>; // Fonction pour récupérer les produits depuis l'API
  fetchCategories: () => Promise<void>; // Fonction pour récupérer les catégories depuis l'API
}

export const useProductStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      categories: [],
      loading: false,
      error: null,
      fetchProducts: async () => {
        try {
          set({ loading: true, error: null });
          const products =  await getProducts();
          set({ 
            products, 
            filteredProducts: products, 
            loading: false 
          });
        } catch (error : any) {
          set({ error: error.message, loading: false });
        }
      },
      fetchCategories: async () => {
        try {
          set({ loading: true, error: null });
          const categories = await getCategories();
          set({ categories, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },
    }),
    {
      name: 'product-storage', // Nom de la clé de stockage dans AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Utilisation d'AsyncStorage pour la persistance 
    }
  )
);