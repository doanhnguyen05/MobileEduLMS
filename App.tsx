import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Linking, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import { webAppHtml } from './src/native/generated/webAppHtml';

const APP_ORIGIN = 'https://mobile-edu-lms.local';
const APP_BASE_URL = `${APP_ORIGIN}/`;

const INJECTED_JAVASCRIPT_BEFORE_CONTENT = `
  (function () {
    const originalOpen = window.open;

    window.open = function (url, target, features) {
      if (typeof url === 'string' && url.length > 0) {
        window.location.href = url;
        return null;
      }

      if (originalOpen) {
        return originalOpen.call(window, url, target, features);
      }

      return null;
    };
  })();
  true;
`;

function isInternalUrl(url: string) {
  if (!url) {
    return true;
  }

  if (url === 'about:blank') {
    return true;
  }

  return url.startsWith(APP_BASE_URL) || url.startsWith(`${APP_ORIGIN}#`) || url.startsWith(`${APP_ORIGIN}/#`);
}

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!canGoBack || !webViewRef.current) {
        return false;
      }

      webViewRef.current.goBack();
      return true;
    });

    return () => subscription.remove();
  }, [canGoBack]);

  const handleNavigationStateChange = (navigationState: WebViewNavigation) => {
    setCanGoBack(navigationState.canGoBack);
  };

  const handleShouldStartLoadWithRequest = (request: { url: string }) => {
    if (isInternalUrl(request.url)) {
      return true;
    }

    Linking.openURL(request.url).catch((error) => {
      console.error('Could not open external URL:', error);
    });

    return false;
  };

  if (hasError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorState}>
          <Text style={styles.errorTitle}>Không thể tải giao diện Expo</Text>
          <Text style={styles.errorText}>
            Hãy chạy lại `npm run prepare:expo` hoặc `npm run start` để tạo lại gói web nhúng.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <WebView
        ref={webViewRef}
        source={{ html: webAppHtml, baseUrl: APP_BASE_URL }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        startInLoadingState
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT_BEFORE_CONTENT}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        overScrollMode="never"
        onError={() => setHasError(true)}
        onHttpError={() => setHasError(true)}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        renderLoading={() => (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color="#2563eb" />
            <Text style={styles.loadingText}>Đang nạp mobileEduLMS...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#1f2937',
  },
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4b5563',
    textAlign: 'center',
  },
});
