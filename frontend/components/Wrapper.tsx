import { 
    StyleSheet, Text,
    View, Platform } from 'react-native';
import { AppColors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

/* 
Un composant container pour appliquer des styles globaux
typage de children en React.ReactNode qui permet de passer 
n'importe quel élément React (des composants, du texte, etc).
sans le typage, TypeScript pourrait générer des erreurs 
*/
const Wrapper = ({ children } : { children: React.ReactNode}) => {
  return (
    // Utilisation de SafeAreaView pour gérer les zones sûres
    <SafeAreaView style={styles.safeView}>
      {/* Conteneur principal avec styles appliqués */}
      <View style={styles.container}>
        {/* Rendu des enfants passés au composant */}
        {children}
      </View>
    </SafeAreaView>
    
  )
}

export default Wrapper

// Styles globaux pour le Wrapper StyleSheet 
// permet d'optimiser les performances
const styles = StyleSheet.create({
  safeView : {
    flex:1,
    backgroundColor: AppColors.background.primary,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  container : {
    flex: 1,
    backgroundColor: AppColors.background.primary,
    paddingHorizontal : 20,
    paddingVertical : 10,
  }
})