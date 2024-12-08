import { useState } from 'react';
import { WebView } from 'react-native-webview';
import LoadingScreen from './components/LoadingScreen';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <WebView
        source={{ uri: 'https://nakamastream.lat/login' }}
        style={{ flex: 1 }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && <LoadingScreen />}
    </>
  );
}
