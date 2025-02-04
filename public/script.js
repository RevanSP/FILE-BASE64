document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('fileInput');
    const base64Output = document.getElementById('base64Output');
    const downloadBase64Btn = document.getElementById('downloadBase64Btn');
    const base64Input = document.getElementById('base64Input');
    const downloadBtn = document.getElementById('downloadBtn');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            downloadBase64Btn.innerHTML = '<span class="loading loading-infinity loading-xs"></span>';
            const reader = new FileReader();
            reader.onload = e => {
                base64Output.value = e.target.result;
                downloadBase64Btn.innerHTML = 'COPY';
                toggleCopyButton();
            };
            reader.readAsDataURL(file);
        }
    });

    function toggleCopyButton() {
        downloadBase64Btn.disabled = !base64Output.value;
    }

    downloadBase64Btn.addEventListener('click', () => {
        if (base64Output.value) {
            navigator.clipboard.writeText(base64Output.value).then(() => {
                downloadBase64Btn.innerHTML = 'COPIED';
                setTimeout(() => { downloadBase64Btn.innerHTML = 'COPY'; }, 3000);
            }).catch(err => alert("Failed to copy: " + err));
        } else {
            alert("Please convert a file to Base64 first.");
        }
    });

    function isValidBase64(str) {
        if (!str) return false;
        try {
            if (str.startsWith('data:')) return !!str.split(',')[1];
            return /^[A-Za-z0-9+/]+$/.test(str.replace(/=/g, ''));
        } catch { return false; }
    }

    function getFileExtensionFromMimeType(dataUrl) {
        if (dataUrl.startsWith('data:')) {
            const mime = dataUrl.split(',')[0].split(':')[1].split(';')[0];
            const mimeToExt = {
                'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif',
                'application/pdf': '.pdf', 'text/plain': '.txt', 'application/json': '.json',
                'text/html': '.html', 'text/css': '.css', 'text/javascript': '.js',
                'application/xml': '.xml', 'application/zip': '.zip'
            };
            return mimeToExt[mime] || '.file';
        }
        return '.file';
    }

    base64Input.addEventListener('input', () => {
        const base64String = base64Input.value.trim();
        downloadBtn.disabled = !isValidBase64(base64String);
        base64Input.style.borderColor = isValidBase64(base64String) ? '#000' : '';
    });

    downloadBtn.addEventListener('click', () => {
        const base64String = base64Input.value.trim();
        if (!isValidBase64(base64String)) {
            alert("Please enter a valid Base64 string");
            return;
        }

        const dataUrl = base64String.startsWith('data:') ? base64String : `data:application/octet-stream;base64,${base64String}`;
        const extension = getFileExtensionFromMimeType(dataUrl);
        const fileName = `downloaded${extension}`;
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        link.click();
    });
});