# Hide Favorites Title Firefox Extension

This Firefox extension hides the titles of bookmarks in the bookmarks toolbar to create a denser layout, showing only icons. Titles will still appear as tooltips when you hover over the bookmarks.

## Features

- Toggle bookmark titles between visible and hidden states via popup interface
- Hides bookmark titles in the bookmarks toolbar, showing only icons
- Shows titles as tooltips when hovering over bookmarks
- Creates a much denser layout for better space utilization
- Maintains folder dropdown functionality
- Reduces toolbar height for maximum space efficiency
- Preserves original bookmark titles for easy restoration
- Persistent toggle state across browser sessions

## Installation

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the extension directory and select `manifest.json`

## Usage

1. Click the extension icon in the toolbar to open the popup interface
2. Use the toggle switch to hide/show bookmark titles
3. When enabled, all bookmark titles will be hidden, showing only icons
4. When disabled, all bookmark titles will be restored to their original names
5. Hover over bookmarks to see their titles as tooltips

## Development

The extension consists of the following components:

- `manifest.json`: Extension configuration and permissions
- `popup.html`: User interface with toggle switch
- `popup.js`: Handles popup interface interactions
- `background.js`: Manages bookmark title states and storage
- `icons/`: Contains extension icons (48px and 96px variants)

## Notes

- The extension stores original bookmark titles in memory
- Toggle state is preserved across browser sessions
- Bookmark functionality remains unchanged; only the visual display is affected
- Folder structure and dropdown menus continue to work as normal