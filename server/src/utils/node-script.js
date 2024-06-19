const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const csvFilePath = "C:\\Star POS Market\\export\\ARTICULOS.csv";
const tsvFilePath = path.join("C:\\Star POS Market\\export", 'ARTICULOS.tsv');

const convertCsvToTsv = (csvFilePath, tsvFilePath, callback) => {
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error leyendo el archivo CSV:', err);
            return;
        }

        // Reemplazar punto y coma por tabulación
        const tsvData = data.replace(/;/g, '\t');

        fs.writeFile(tsvFilePath, tsvData, 'utf8', (err) => {
            if (err) {
                console.error('Error escribiendo el archivo TSV:', err);
                return;
            }

            console.log('El archivo CSV ha sido convertido a TSV correctamente.');
            callback();
        });
    });
};

const importToMongo = () => {
    const escapedFilePath = tsvFilePath.replace(/\\/g, '\\\\');
    exec(`mongoimport --uri "mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/ohmyveggie" --collection external-products --type tsv --headerline --file "${escapedFilePath}" --upsert --upsertFields id`, (error, stdout, stderr) => {
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
};

const handleFileChange = (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
        console.log("\nEl archivo", csvFilePath, "fue modificado!");
        console.log("El tipo de cambio fue: change");

        convertCsvToTsv(csvFilePath, tsvFilePath, importToMongo);
    }
};

fs.watchFile(csvFilePath, { interval: 10000 }, handleFileChange);

console.log(`Observando cambios en el archivo ${csvFilePath}`);
console.log("Presiona Ctrl+C para salir.");
