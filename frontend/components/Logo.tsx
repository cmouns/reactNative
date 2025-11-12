import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const Logo = () => {
    // Utilisation du hook useRouter pour la navigation entre les écrans
    const router = useRouter();
  return (
    // Composant TouchableOpacity pour rendre le logo cliquable
    // (ou une autre action tactile)
    // et naviguer vers l'écran d'accueil
    <TouchableOpacity style={styles.logoView} onPress={() => router.push('/')}>
      <MaterialIcons name='shopping-cart' size={25} color={AppColors.primary[700]}/>
      <Text style={styles.logoText}>Shop&apos;N&apos;Go</Text>
    </TouchableOpacity>
  )
}

export default Logo

const styles = StyleSheet.create({
    logoView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText : {
        fontSize : 20,
        marginLeft: 2,
        fontFamily: 'Inter-Bold',
        color: AppColors.primary[700],
    }
})