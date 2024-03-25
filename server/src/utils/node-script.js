const fs = require('fs');
const { exec } = require('child_process');

const filePath = '/home/agustin/Desktop/external-products.csv';


const handleFileChange = (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log("\nEl archivo", filePath, "fue modificado!");
        console.log("El tipo de cambio fue: change");

        exec(`mongoimport --uri {mongodb+srv://agustinmacazzaga:password@ohmyveggie.4xaykot.mongodb.net/ohmyveggie} --collection external-products --type csv --headerline --file ${filePath} --upsert --upsertFields id`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar mongoimport: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log("Importación completada.");
        });
    }
};

fs.watchFile(filePath, { interval: 1000 }, handleFileChange);

console.log(`Observando cambios en el archivo ${filePath}`);
console.log("Presiona Ctrl+C para salir.");

// en Windows, es posible que necesites permisos elevados para ejecutar ciertos comandos.