document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('assignmentFile');
    const fileList = document.getElementById('fileList');
    const dropZone = document.getElementById('dropZone');
    const bookingForm = document.getElementById('bookingForm');

    const PHONE_NUMBER = "918593904483";

    // Drag and Drop Effects
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('dragover');
        }, false);
    });

    // Display chosen files
    fileInput.addEventListener('change', updateFileList);

    function updateFileList() {
        fileList.innerHTML = '';
        const files = Array.from(fileInput.files);

        if (files.length === 0) return;

        files.forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            item.innerHTML = `
                <span>📄 <strong>${file.name}</strong> (${sizeInMB} MB)</span>
                <span>Ready</span>
            `;
            fileList.appendChild(item);
        });
    }

    // Form Submission & WhatsApp Redirect
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('studentName').value.trim();
        const studentClass = document.getElementById('studentClass').value.trim();
        const phone = document.getElementById('studentPhone').value.trim();
        const files = Array.from(fileInput.files);

        if (!name || !studentClass || !phone) {
            alert('Please fill out all required fields.');
            return;
        }

        let fileDetails = "No file selected";
        if (files.length > 0) {
            fileDetails = files.map(f => f.name).join(', ');
        }

        const whatsappText = 
            `Hello P² Freelancing! I would like to book assignment help.%0A%0A` +
            `*Client Details:*%0A` +
            `• *Name:* ${encodeURIComponent(name)}%0A` +
            `• *Class/Course:* ${encodeURIComponent(studentClass)}%0A` +
            `• *Phone:* ${encodeURIComponent(phone)}%0A%0A` +
            `*Attached Documents:* ${encodeURIComponent(fileDetails)}%0A%0A` +
            `I am ready to upload my files into this chat.`;

        const whatsappURL = `https://wa.me/${PHONE_NUMBER}?text=${whatsappText}`;

        window.open(whatsappURL, '_blank');
    });
});