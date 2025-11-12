// import { Image } from 'expo-image';
import HomeHeader from '@/components/HomeHeader';
import { Platform, StyleSheet, View, Text } from 'react-native';
// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return(
    <SafeAreaView>
      <View>
        <HomeHeader />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
});
