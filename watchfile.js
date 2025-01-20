const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");
const path = require("path");
const nodemailer = require("nodemailer");
const backupBaseDir = "C:\\Star POS Market\\backups";

const URL = "https://omvrosario.com:4000";
const newBackupFolder = () => {
  const date = new Date();
  const folderName = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}___${date
    .getHours()
    .toString()
    .padStart(2, "0")}.${date.getMinutes().toString().padStart(2, "0")}.${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  const backupDir = path.join(backupBaseDir, folderName);
  fs.mkdirSync(backupDir);
  return backupDir;
};

const csvFilePath = "C:\\Star POS Market\\export\\ARTICULOS.csv";

//Para hacer RESTORE
// mongorestore --uri "mongodb+srv://matiastrovant:mhjjqrxCRldG7UAb@omvtest.72ckbwy.mongodb.net/" --db ohmyveggie --drop products.bson

// const dbURL =
//   //  "mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/";
//   // "mongodb+srv://matiastrovant:mhjjqrxCRldG7UAb@omvtest.72ckbwy.mongodb.net/";
//   "mongodb://admin:k1k1r1ki@omvrosario.com:27017/admin";

// const dbNAME = "ohmyveggie";

const transporter = nodemailer.createTransport({
  host: "c1912270.ferozo.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@omvrosario.com",
    pass: "VEGGIElocal48*",
  },
});
const sendNotificationEmail = async (message) => {
  const mailOptions = {
    from: "info@omvrosario.com",
    to: [
      "info@omvrosario.com",
      "administrator@codice.dev",
      "mtrovant@gmail.com",
    ],
    subject: "Problema con la Importación de Productos",
    text: `Después de varios intentos, la colección 'external-products' sigue vacía. Favor de revisar el sistema. 
    Mensaje de Error: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de notificación enviado.");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
};

const parseCsvFile = async (filePath) => {
  const products = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (row) => {
        // Convertir las filas relevantes
        products.push({
          externalId: /[a-zA-Z-]/.test(row.id) ? row.id : +row.id,
          name: row.nombre,
          price: parseFloat(row.precio) || 0,
          countInStock: parseFloat(row.stock) || 0,
          activo: row.activo === "S",
        });
      })
      .on("end", () => resolve(products))
      .on("error", (error) => reject(error));
  });
};

const importToMongo = async () => {
  const backupDir = await newBackupFolder();
  const extProducts = await parseCsvFile(csvFilePath);

  if (extProducts.length === 0) {
    console.error("El archivo CSV no contiene productos. Abortando.");
    return;
  }
  const activeProducts = extProducts.filter((product) => product.activo);

  try {
    // Actualizar o insertar productos activos

    const response = await axios.post(
      `${URL}/products/script/add`,
      activeProducts
    );

    console.log("Actualización de productos completada.");
  } catch (error) {
    console.error("Error al actualizar productos:", error);
    sendNotificationEmail(error.message);
  }
};

const handleFileChange = async (db, curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log(
      `\nEl archivo, ${csvFilePath}, fue modificado a las ${new Date()}!`
    );
    importToMongo();
  }
};

(async () => {
  fs.watchFile(csvFilePath, { interval: 10000 }, (curr, prev) => {
    handleFileChange(null, curr, prev);
  });

  console.log(
    `
¡Bienvenid@ al script de optimización para \x1b[35mOh My Veggie\x1b[0m version 3.0! Observando cambios en el archivo: ${csvFilePath}`
  );
  console.log("Presiona Ctrl+C para salir.");
})();
