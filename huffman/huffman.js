const fs = require("fs");

class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }
  enqueue(node) {
    this.nodes.push(node);
    this.nodes.sort((a, b) => a.freq - b.freq);
  }
  dequeue() {
    return this.nodes.shift();
  }
  size() {
    return this.nodes.length;
  }
}

function buildFrequencyMap(data) {
  const freqMap = {};
  for (const char of data) {
    freqMap[char] = (freqMap[char] || 0) + 1;
  }
  return freqMap;
}

function buildHuffmanTree(freqMap) {
  const pq = new PriorityQueue();
  for (const [char, freq] of Object.entries(freqMap)) {
    pq.enqueue(new HuffmanNode(char, freq));
  }
  while (pq.size() > 1) {
    const left = pq.dequeue();
    const right = pq.dequeue();
    const parent = new HuffmanNode(null, left.freq + right.freq, left, right);
    pq.enqueue(parent);
  }
  return pq.dequeue();
}

function buildCodes(node, path = "", codeMap = {}) {
  if (!node) return;
  if (node.char !== null) {
    codeMap[node.char] = path;
  }
  buildCodes(node.left, path + "0", codeMap);
  buildCodes(node.right, path + "1", codeMap);
  return codeMap;
}

function encodeData(data, codeMap) {
  return data.split("").map(char => codeMap[char]).join("");
}

function padBinaryString(binaryString) {
  const padding = 8 - (binaryString.length % 8);
  return binaryString + "0".repeat(padding === 8 ? 0 : padding);
}

function binaryToBuffer(binaryString) {
  const padded = padBinaryString(binaryString);
  const buffer = Buffer.alloc(padded.length / 8);
  for (let i = 0; i < padded.length; i += 8) {
    buffer[i / 8] = parseInt(padded.slice(i, i + 8), 2);
  }
  return buffer;
}

function compressFile(inputPath, outputPath) {
  const input = fs.readFileSync(inputPath, "utf-8");
  const freqMap = buildFrequencyMap(input);
  const tree = buildHuffmanTree(freqMap);
  const codeMap = buildCodes(tree);
  const encoded = encodeData(input, codeMap);
  const buffer = binaryToBuffer(encoded);

  const metadata = {
    codes: codeMap,
    length: encoded.length
  };

  const output = Buffer.concat([
    Buffer.from(JSON.stringify(metadata) + "\n", "utf-8"),
    buffer
  ]);

  fs.writeFileSync(outputPath, output);

  return {
    originalSize: input.length,
    compressedSize: output.length
  };
}

module.exports = { compressFile };