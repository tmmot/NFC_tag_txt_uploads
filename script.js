// File storage (using localStorage for persistence)
let uploadedFiles = JSON.parse(localStorage.getItem('nfcFiles')) || [];

// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const nfcTagInput = document.getElementById('nfcTag');
const descriptionInput = document.getElementById('description');
const uploadStatus = document.getElementById('uploadStatus');
const filesList = document.getElementById('filesList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFiles();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Upload area click
    uploadArea.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Upload button
    uploadBtn.addEventListener('click', uploadFile);

    // Enter key on inputs
    nfcTagInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') uploadFile();
    });
}

// Handle file selection
function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];

    if (!file.type.includes('text') && !file.name.endsWith('.txt')) {
        showStatus('Please select a text file (.txt)', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showStatus('File size must be less than 5MB', 'error');
        return;
    }

    // Read file
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        document.fileContent = content;
        document.fileName = file.name;
        showStatus(`File selected: ${file.name} (${formatFileSize(file.size)})`, 'info');
    };
    reader.readAsText(file);
}

// Upload file
function uploadFile() {
    if (!document.fileContent) {
        showStatus('Please select a file first', 'error');
        return;
    }

    if (!nfcTagInput.value.trim()) {
        showStatus('Please enter an NFC Tag ID', 'error');
        return;
    }

    const fileEntry = {
        id: generateId(),
        nfcTag: nfcTagInput.value.trim(),
        fileName: document.fileName,
        content: document.fileContent,
        description: descriptionInput.value.trim(),
        uploadDate: new Date().toLocaleDateString(),
        uploadTime: new Date().toLocaleTimeString(),
        shareLink: generateShareLink()
    };

    uploadedFiles.unshift(fileEntry);
    localStorage.setItem('nfcFiles', JSON.stringify(uploadedFiles));

    showStatus(`✓ File linked to NFC tag "${fileEntry.nfcTag}" successfully!`, 'success');

    // Reset form
    resetForm();
    renderFiles();
}

// Render files list
function renderFiles() {
    if (uploadedFiles.length === 0) {
        filesList.innerHTML = '<p class="empty-state">No files uploaded yet. Start by uploading your first file!</p>';
        return;
    }

    filesList.innerHTML = uploadedFiles.map(file => `
        <div class="file-card">
            <div class="file-card-header">
                <div class="file-info">
                    <span class="file-tag">🏷️ ${escapeHtml(file.nfcTag)}</span>
                    <h3>${escapeHtml(file.fileName)}</h3>
                    <p>📅 ${file.uploadDate} at ${file.uploadTime}</p>
                </div>
            </div>
            ${file.description ? `<div class="file-description">📝 ${escapeHtml(file.description)}</div>` : ''}
            <div class="file-preview">${escapeHtml(file.content.substring(0, 200))}${file.content.length > 200 ? '...' : ''}</div>
            <div class="file-actions">
                <button class="btn btn-secondary" onclick="viewFile('${file.id}')">👁️ View Full</button>
                <button class="btn btn-secondary" onclick="copyLink('${file.shareLink}')">🔗 Copy Link</button>
                <button class="btn btn-danger" onclick="deleteFile('${file.id}')">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// View full file
function viewFile(fileId) {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
            <h2>${escapeHtml(file.fileName)}</h2>
            <p style="color: #666; margin-bottom: 15px;">NFC Tag: <strong>${escapeHtml(file.nfcTag)}</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; font-size: 0.9em;">
${escapeHtml(file.content)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Copy share link
function copyLink(link) {
    navigator.clipboard.writeText(link);
    showStatus('📋 Link copied to clipboard!', 'success');
}

// Delete file
function deleteFile(fileId) {
    if (confirm('Are you sure you want to delete this file?')) {
        uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
        localStorage.setItem('nfcFiles', JSON.stringify(uploadedFiles));
        renderFiles();
        showStatus('File deleted', 'info');
    }
}

// Reset form
function resetForm() {
    fileInput.value = '';
    nfcTagInput.value = '';
    descriptionInput.value = '';
    document.fileContent = null;
    document.fileName = null;
}

// Show status message
function showStatus(message, type) {
    uploadStatus.textContent = message;
    uploadStatus.className = `status-message show ${type}`;
    
    if (type !== 'error') {
        setTimeout(() => {
            uploadStatus.classList.remove('show');
        }, 4000);
    }
}

// Utility functions
function generateId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateShareLink() {
    return `${window.location.origin}${window.location.pathname}?file=${generateId()}`;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}