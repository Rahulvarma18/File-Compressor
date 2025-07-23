const form = document.getElementById("compressForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const res = await fetch("/compress", {
    method: "POST",
    body: formData,
  });

  const kb = (bytes) => (bytes / 1024).toFixed(2);

  if (!res.ok) {
    resultDiv.innerHTML = " Compression failed.";
    return;
  }

  const data = await res.json();
  resultDiv.innerHTML = `
    <p>Original Size: <b>${kb(data.originalSize)} KB</b></p>
    <p>Compressed Size: <b>${kb(data.compressedSize)} KB</b></p>
    <p>Compression Ratio: <b>${data.ratio}%</b></p>
    <a href="${data.downloadLink}" download>⬇️ Download Compressed File</a>
  `;
});