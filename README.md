# 📝 NFC Tag Text Upload

A simple, elegant web application that allows you to upload text files and link them to your NFC tags. Perfect for storing metadata, product information, or any text content associated with your NFC/NFT tags.

## Features

✨ **Key Features:**
- 🎯 Upload text files and link them to NFC tag IDs
- 💾 Files stored locally in your browser (no server required)
- 🔗 Generate shareable links for each upload
- 📋 Add descriptions to your files
- 👁️ View full file content in a modal
- 🗑️ Delete files you no longer need
- 📱 Fully responsive design
- 🎨 Beautiful, modern UI with gradient backgrounds

## How to Use

1. **Upload a File:**
   - Drag and drop a `.txt` file into the upload area, or click to select
   - Enter your NFC Tag ID (e.g., `NFT-001`, `MyTag`, etc.)
   - (Optional) Add a description
   - Click "Upload & Link"

2. **Manage Your Files:**
   - View all uploaded files on the right side
   - Click "View Full" to see the complete file content
   - Click "Copy Link" to get a shareable link
   - Click "Delete" to remove a file

3. **Files are stored locally** - they persist in your browser even after closing

## Installation

### Live Website
Your website is live at: **https://tmmot.github.io/NFC_tag_txt_uploads/**

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/tmmot/NFC_tag_txt_uploads.git
   cd NFC_tag_txt_uploads
   ```

2. Open `index.html` in your browser (or use a local server):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## File Structure

```
NFC_tag_txt_uploads/
├── index.html      # Main HTML file
├── style.css       # Styling and layout
├── script.js       # Functionality and storage
└── README.md       # Documentation (this file)
```

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - Functionality without dependencies
- **LocalStorage** - Client-side file storage

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Limitations

- **Storage:** Limited by browser localStorage (~5-10MB depending on browser)
- **File Size:** Maximum 5MB per file
- **File Type:** Text files only (.txt)
- **Persistence:** Data is stored locally on each device/browser

## Future Enhancements

- [ ] Add support for multiple file types
- [ ] Export all files as a backup
- [ ] Import previously backed up files
- [ ] Add tags/categories for organization
- [ ] Syntax highlighting for code files
- [ ] Search functionality
- [ ] Backend integration for cloud storage

## License

This project is open source and available for personal and commercial use.

## Support

For issues or feature requests, please create an issue in the GitHub repository.

---

**Built with ❤️ for NFT enthusiasts and developers**