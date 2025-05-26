// Store original titles in chrome.storage.local instead of memory since service workers can be terminated

// Initialize extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ hideTitles: false, originalTitles: {} });
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleTitles') {
    handleTitleToggle(message.hideTitles);
    return true; // Indicates we'll send a response asynchronously
  }
});

async function handleTitleToggle(hideTitles) {
  const bookmarks = await chrome.bookmarks.getTree();
  if (hideTitles) {
    // Store and hide titles
    await processBookmarks(bookmarks, true);
  } else {
    // Restore original titles
    await processBookmarks(bookmarks, false);
  }
}

async function processBookmarks(bookmarkItems, hiding) {
  // Get stored titles
  const { originalTitles } = await chrome.storage.local.get('originalTitles');

  for (const item of bookmarkItems) {
    if (item.children) {
      await processBookmarks(item.children, hiding);
    }
    if (item.url) { // Only process actual bookmarks, not folders
      if (hiding) {
        // Store original title and set empty title
        originalTitles[item.id] = item.title;
        await chrome.storage.local.set({ originalTitles });
        await chrome.bookmarks.update(item.id, { title: '' });
      } else {
        // Restore original title
        const originalTitle = originalTitles[item.id];
        if (originalTitle) {
          await chrome.bookmarks.update(item.id, { title: originalTitle });
          delete originalTitles[item.id];
          await chrome.storage.local.set({ originalTitles });
        }
      }
    }
  }
}

// Handle extension startup
chrome.storage.local.get('hideTitles').then(result => {
  if (result.hideTitles) {
    handleTitleToggle(true);
  }
});