
#  File Compressor using Huffman Coding

A web-based file compression tool that uses **Huffman coding** to compress `.txt` files. Built with **Node.js**, **Express**, and a beautiful **responsive frontend**.

<div align="center">
  <img src="ui1.png" width="600"/>
  <br/><br/>
</div>

---

##  Features

- Upload `.txt` files directly from your browser
-  Compresses files using **Huffman Coding Algorithm**
-  Shows:
  - Original Size
  - Compressed Size
  - Compression Ratio
-  Download the compressed `.huff` file instantly
- Responsive & clean UI using HTML/CSS

---

## Demo UI

<table>
  <tr>
    <td><img src="ui1.png" width="400"/></td>
  </tr>
</table>

---

## Tech Stack

- **Frontend**: HTML, CSS (custom),JavaScript
- **Backend**: Node.js, Express.js
- **Compression Algorithm**: Huffman Encoding (implemented from scratch)
- **File Upload Handling**: express-fileupload
- **Environment Config**: dotenv

---

##  Folder Structure

```
File-Compressor/
├── app.js
├── huffman/
│   └── huffman.js
├── routes/
│   └── compress.js
├── views/
│   └── index.html
├── public/
│   ├── styles.css
│   └── script.js
├── uploads/
│   ├── input/
│   └── output/
├── .env
├── .gitignore
└── package.json
```

---

##  How to Run Locally

###  Prerequisites

- Node.js v18+ installed
- Git

###  Steps

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/filecompressor.git
cd filecompressor

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser 🚀

---

## Limitations

- Only supports **.txt** files for compression (others like `.pdf` will result in larger size)
- Huffman works well on text due to character redundancy — not binary formats

---

##  Concepts Used

- Huffman Coding Tree
- Min-Heap priority queue
- File buffer manipulation
- Binary string conversion & padding
- FormData / file upload with fetch

---

by Rahul Varma

> Feel free to fork, clone, or suggest improvements!

---


