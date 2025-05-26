document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('titleToggle');
  const statusText = document.getElementById('status');

  // Load the current state
  chrome.storage.local.get('hideTitles').then(result => {
    toggleSwitch.checked = result.hideTitles || false;
    updateStatusText(result.hideTitles);
  });

  // Handle toggle changes
  toggleSwitch.addEventListener('change', (e) => {
    const hideTitles = e.target.checked;
    
    // Save the state
    chrome.storage.local.set({ hideTitles });
    
    // Update status text
    updateStatusText(hideTitles);

    // Send message to background script
    chrome.runtime.sendMessage({ action: 'toggleTitles', hideTitles });
  });

  function updateStatusText(hideTitles) {
    statusText.textContent = hideTitles ? 'Titles Hidden' : 'Titles Visible';
  }
});