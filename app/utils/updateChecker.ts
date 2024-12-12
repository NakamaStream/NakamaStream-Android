import { GITHUB_API_URL, CURRENT_VERSION } from '../constants/config';

export const checkForUpdates = async () => {
  try {
    const response = await fetch(GITHUB_API_URL);
    const data = await response.json();
    const latestVersion = data.tag_name.replace('v', '');
    
    if (latestVersion > CURRENT_VERSION) {
      return {
        needsUpdate: true,
        updateUrl: data.html_url,
        version: latestVersion
      };
    }
    return { needsUpdate: false };
  } catch (error) {
    console.error('Error al verificar actualizaciones:', error);
    return { needsUpdate: false };
  }
}; 
