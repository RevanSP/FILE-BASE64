document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById('fileInput');
  const base64Output = document.getElementById('base64Output');
  const downloadBase64Btn = document.getElementById('downloadBase64Btn');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      downloadBase64Btn.innerHTML = '<span class="loading loading-infinity loading-xs"></span>';
      
      const reader = new FileReader();
      reader.onload = function (e) {
        base64Output.value = e.target.result;
        downloadBase64Btn.innerHTML = 'COPY';
        toggleCopyButton();  
      };

      reader.readAsDataURL(file);
    }
  });

  function toggleCopyButton() {
    const base64String = base64Output.value;
    if (base64String) {
      downloadBase64Btn.disabled = false; 
    } else {
      downloadBase64Btn.disabled = true;  
    }
  }

  downloadBase64Btn.addEventListener('click', () => {
    const base64String = base64Output.value;
    if (base64String) {
      navigator.clipboard.writeText(base64String).then(() => {
        downloadBase64Btn.innerHTML = 'COPIED';
        
        setTimeout(() => {
          downloadBase64Btn.innerHTML = 'COPY';
        }, 3000);  
      }).catch(err => {
        alert("Failed to copy: " + err);
      });
    } else {
      alert("Please convert a file to Base64 first.");
    }
  });
});