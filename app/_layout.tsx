import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Dimensions, ScaledSize } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import LoadingScreen from './components/LoadingScreen';
import NetworkCheck from './components/NetworkCheck';
import UpdateModal from './components/UpdateModal';
import { checkForUpdates } from './utils/updateChecker';
import { CURRENT_VERSION } from './constants/config';
import * as Notifications from 'expo-notifications';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    updateUrl: '',
    newVersion: ''
  });

  useEffect(() => {
    ScreenOrientation.unlockAsync();

    const verifyUpdates = async () => {
      const result = await checkForUpdates();
      if (result.needsUpdate) {
        setUpdateInfo({
          updateUrl: result.updateUrl,
          newVersion: result.version
        });
        setShowUpdateModal(true);
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Actualización disponible",
            body: `Nueva versión ${result.version} está disponible.`,
            data: { updateUrl: result.updateUrl },
          },
          trigger: null,
        });
      }
    };

    verifyUpdates();
  }, []);

  const handleOrientationChange = async ({ window }: { window: ScaledSize }) => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setIsFullscreen(true);
    } else {
      await ScreenOrientation.unlockAsync();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);
    return () => subscription.remove();
  }, []);

  const webViewStyle = isFullscreen ? 
    [styles.webview, styles.fullscreen] : 
    styles.webview;

  return (
    <>
      <NetworkCheck>
        <WebView
          source={{ uri: 'https://nakamastream.lat/login' }}
          style={webViewStyle}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        {isLoading && <LoadingScreen />}
      </NetworkCheck>

      <UpdateModal
        visible={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        updateUrl={updateInfo.updateUrl}
        currentVersion={CURRENT_VERSION}
        newVersion={updateInfo.newVersion}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  }
});
