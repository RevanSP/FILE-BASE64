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
        downloadBase64Btn.innerHTML = 'Download as File';  
      };

      reader.readAsDataURL(file);
    }
  });

  downloadBase64Btn.addEventListener('click', () => {
    const base64String = base64Output.value;
    if (base64String) {
      const link = document.createElement('a');
      link.href = base64String;
      link.download = "file_from_base64";
      link.click();
    } else {
      alert("Please convert a file to Base64 first.");
    }
  });
});
