const TOPIC_VIDEO_QUERIES: Record<string, string> = {
  '1': 'React Native introduction tutorial',
  '2': 'React Native environment setup Expo tutorial',
  '3': 'React Native core components tutorial',
  '4': 'React Native state props tutorial',
  '5': 'React Native StyleSheet tutorial',
  '6': 'React Native FlatList ScrollView tutorial',
  '7': 'React Navigation basics React Native tutorial',
  '101': 'Flutter architecture overview tutorial',
  '102': 'Flutter custom widgets tutorial',
  '103': 'Flutter BLoC pattern tutorial',
  '104': 'Flutter Riverpod state management tutorial',
  '105': 'Flutter advanced animations tutorial',
  '106': 'Flutter performance optimization tutorial',
  '201': 'SwiftUI introduction tutorial',
  '202': 'SwiftUI views modifiers tutorial',
  '203': 'SwiftUI state binding tutorial',
  '204': 'SwiftUI lists navigation tutorial',
  '205': 'SwiftUI forms user input tutorial',
  '206': 'SwiftUI animations tutorial',
  '301': 'Kotlin basics Android tutorial',
  '302': 'Android Activity Fragment Kotlin tutorial',
  '303': 'Android RecyclerView Kotlin tutorial',
  '304': 'Android Room database Kotlin tutorial',
  '305': 'Android MVVM Kotlin tutorial',
  '306': 'Android Retrofit API Kotlin tutorial',
  '401': 'Swift programming basics tutorial',
  '402': 'Swift variables data types tutorial',
  '403': 'Swift control flow tutorial',
  '404': 'Swift functions closures tutorial',
  '405': 'UIKit fundamentals tutorial',
  '406': 'iOS Auto Layout tutorial',
  '501': 'Jetpack Compose basics tutorial',
  '502': 'Jetpack Compose composable functions tutorial',
  '503': 'Jetpack Compose layouts tutorial',
  '504': 'Jetpack Compose state management tutorial',
  '505': 'Jetpack Compose Material Design 3 tutorial',
  '506': 'Jetpack Compose Navigation tutorial',
  '601': 'Firebase setup React Native tutorial',
  '602': 'Firebase Authentication React Native tutorial',
  '603': 'Firebase email password authentication React Native tutorial',
  '604': 'Google Sign In Firebase React Native tutorial',
  '605': 'Firestore database React Native tutorial',
  '606': 'Firebase Cloud Storage React Native tutorial',
  '701': 'Flutter ecommerce project setup tutorial',
  '702': 'Flutter ecommerce app architecture tutorial',
  '703': 'Flutter ecommerce home screen UI tutorial',
  '704': 'Flutter ecommerce product listing tutorial',
  '705': 'Flutter ecommerce product detail page tutorial',
  '706': 'Flutter ecommerce shopping cart tutorial',
  '707': 'Flutter ecommerce checkout flow tutorial',
  '708': 'Flutter ecommerce payment integration tutorial',
};

function buildYouTubeSearchEmbedUrl(query: string) {
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;
}

export function resolveDemoVideoUrl(lessonId: string, videoUrl: string) {
  if (videoUrl && !videoUrl.includes('example.com')) {
    return videoUrl;
  }

  return buildYouTubeSearchEmbedUrl(TOPIC_VIDEO_QUERIES[lessonId] ?? 'mobile app development tutorial');
}
