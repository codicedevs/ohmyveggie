const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const readline = require("readline");
const mongoose = require("mongoose");

const backupBaseDir = "C:\\Star POS Market\\backups";

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

const dbURL =
  //   "mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/";
  "mongodb+srv://matiastrovant:mhjjqrxCRldG7UAb@omvtest.72ckbwy.mongodb.net/";

const dbNAME = "ohmyveggie";

const transporter = nodemailer.createTransport({
  host: "c1912270.ferozo.com",
  port: 465,
  secure: true,
  auth: {
    user: "info@omvrosario.com",
    pass: "VEGGIElocal48*",
  },
});
const sendNotificationEmail = async (retryCount) => {
  const mailOptions = {
    from: "info@omvrosario.com",
    to: [
      "info@omvrosario.com",
      "administrator@codice.dev",
      "mtrovant@gmail.com",
    ],
    subject: "Problema con la Importación de Productos",
    text: `Después de ${retryCount} intentos, la colección 'external-products' sigue vacía. Favor de revisar el sistema.`,
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
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const [id, nombre, stock, precio, activo] = line.split(";");
    products.push({
      externalId: parseInt(id, 10),
      name: nombre,
      countInStock: parseInt(stock, 10),
      price: parseFloat(precio),
      activo: activo === "S",
    });
  }
  console.log(products, "los productos");
  return products;
};

const importToMongo = async (db) => {
  const backupDir = await newBackupFolder();
  const extProducts = await parseCsvFile(csvFilePath);

  if (extProducts.length === 0) {
    console.error("El archivo CSV no contiene productos. Abortando.");
    return;
  }

  const activeProducts = extProducts.filter((product) => product.activo);
  const activeIds = activeProducts.map((product) => product.externalId);

  try {
    // Actualizar o insertar productos activos

    console.log("asd", activeProducts);

    const a = await Promise.all(
      activeProducts.map((product) =>
        db
          .collection("products")
          .updateOne(
            { externalId: product.externalId },
            { $set: product },
            { upsert: true }
          )
      )
    );
    console.log(123, a);

    // Eliminar productos inactivos
    await db
      .collection("products")
      .deleteMany({ externalId: { $nin: activeIds } });

    console.log("Actualización de productos completada.");
  } catch (error) {
    console.error("Error al actualizar productos:", error);
  }
};

const handleFileChange = async (db, curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log("\nEl archivo", csvFilePath, "fue modificado!");
    importToMongo(db);
  }
};

(async () => {
  const client = new MongoClient(dbURL, { monitorCommands: true });
  await client.connect();
  const db = client.db(dbNAME);

  fs.watchFile(csvFilePath, { interval: 10000 }, (curr, prev) => {
    handleFileChange(db, curr, prev);
  });

  console.log(
    `¡Bienvenid@ al script de optimización para Oh My Veggie version 1.0! Observando cambios en el archivo: ${csvFilePath}`
  );
  console.log("Presiona Ctrl+C para salir.");
})();
