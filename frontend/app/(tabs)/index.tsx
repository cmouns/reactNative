// import { Image } from 'expo-image';
import HomeHeader from "@/components/HomeHeader";
import LoadingSpinner from "@/components/LoadingSpinner";
import Wrapper from "@/components/Wrapper";
import { AppColors } from "@/constants/theme";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/type";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProductCard from "@/components/ProductCard";

export default function HomeScreen() {
  const router = useRouter();
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

  const navigateToCategory = (category: string) => {
    router.push({
      pathname: "/(tabs)/shop",
      params: { category },
    });
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <LoadingSpinner fullScreen />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.wrapper}>
      <HomeHeader />
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainerView}
        >
          <View style={styles.categoriesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Catégories</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories?.map((category) => (
                <TouchableOpacity
                  style={styles.categoryButton}
                  key={category}
                  onPress={() => navigateToCategory(category)}
                >
                  <AntDesign
                    name="tag"
                    size={16}
                    color={AppColors.primary[500]}
                  />

                  <Text style={styles.categoryText}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Meilleurs Ventes</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featuredProducts}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredProductsContainer}
              renderItem={({ item }) => (
                <View style={styles.featuredProductContainer}>
                  <ProductCard product={item} compact/>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: AppColors.error,
    textAlign: "center",
  },
  contentContainer: {
    paddingLeft: 20,
  },
  scrollContainerView: {
    paddingBottom: 300,
  },
  categoryText: {
    marginLeft: 6,
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: AppColors.text.primary,
    textTransform: "capitalize",
  },
  categoriesSection: {
    marginTop: 10,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.background.secondary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 5,
    minWidth: 100,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.primary[500],
  },
  wrapper: {
    flex: 1,
    backgroundColor: AppColors.background.primary,
  },
  featuredProductsContainer : {

  },
  featuredProductContainer : {

  },
  seeAllText : {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: AppColors.primary[500],
  }
});
