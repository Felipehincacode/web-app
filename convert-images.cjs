const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'src', 'assets', 'equipo-fullface.jpg');
const outputPath = path.join(__dirname, 'src', 'assets', 'equipo-fullface.webp');

sharp(inputPath)
  .webp({ quality: 80, effort: 6 }) // Alta calidad pero muy optimizado
  .toFile(outputPath)
  .then(info => {
    console.log('¡Imagen convertida con éxito a WebP!');
    console.log('Tamaño original era aprox 241KB');
    console.log('Nuevo tamaño:', (info.size / 1024).toFixed(2), 'KB');
  })
  .catch(err => {
    console.error('Error convirtiendo la imagen:', err);
  });
