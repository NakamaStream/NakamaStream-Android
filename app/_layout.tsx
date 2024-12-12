import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import LoadingScreen from './components/LoadingScreen';
import NetworkCheck from './components/NetworkCheck';
import UpdateModal from './components/UpdateModal';
import { checkForUpdates } from './utils/updateChecker';
import { CURRENT_VERSION } from './constants/config';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    updateUrl: '',
    newVersion: ''
  });

  useEffect(() => {
    const verifyUpdates = async () => {
      const result = await checkForUpdates();
      if (result.needsUpdate) {
        setUpdateInfo({
          updateUrl: result.updateUrl,
          newVersion: result.version
        });
        setShowUpdateModal(true);
      }
    };

    verifyUpdates();
  }, []);

  return (
    <>
      <NetworkCheck>
        <WebView
          source={{ uri: 'https://nakamastream.lat/login' }}
          style={{ flex: 1 }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
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
