// import { Image } from 'expo-image';
import HomeHeader from "@/components/HomeHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Wrapper from "@/components/Wrapper";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/type";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const {
    products,
    categories,
    fetchProducts,
    fetchCategories,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const reverseProducts = [...products].reverse();
      setFeaturedProducts(reverseProducts as Product[]);
    }
  }, [products]);

  if (loading) {
  return (
    <Wrapper>
      <LoadingSpinner fullScreen />
    </Wrapper>
  );  
  }
}

const styles = StyleSheet.create({});
