// Store original titles
let originalTitles = new Map();

// Initialize extension state
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ hideTitles: false });
});

// Listen for messages from popup
browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleTitles') {
    handleTitleToggle(message.hideTitles);
  }
});

async function handleTitleToggle(hideTitles) {
  const bookmarks = await browser.bookmarks.getTree();
  if (hideTitles) {
    // Store and hide titles
    await processBookmarks(bookmarks, true);
  } else {
    // Restore original titles
    await processBookmarks(bookmarks, false);
  }
}

async function processBookmarks(bookmarkItems, hiding) {
  for (const item of bookmarkItems) {
    if (item.children) {
      await processBookmarks(item.children, hiding);
    }
    if (item.url) { // Only process actual bookmarks, not folders
      if (hiding) {
        // Store original title and set empty title
        originalTitles.set(item.id, item.title);
        await browser.bookmarks.update(item.id, { title: '' });
      } else {
        // Restore original title
        const originalTitle = originalTitles.get(item.id);
        if (originalTitle) {
          await browser.bookmarks.update(item.id, { title: originalTitle });
          originalTitles.delete(item.id);
        }
      }
    }
  }
}

// Handle extension startup
browser.storage.local.get('hideTitles').then(result => {
  if (result.hideTitles) {
    handleTitleToggle(true);
  }
});