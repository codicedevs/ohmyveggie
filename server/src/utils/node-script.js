const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
const tsvFilePath = path.join("C:\\Star POS Market\\export", "ARTICULOS.tsv");

const dbURL =
  // "mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net/";
  "mongodb+srv://matiastrovant:mhjjqrxCRldG7UAb@omvtest.72ckbwy.mongodb.net/";
const dbNAME = "ohmyveggie";

const productSchema = new Schema(
  {
    name: String,
    category: String,
    image: String,
    price: Number,
    countInStock: Number,
    externalId: Number,
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

const transform = (rawProduct) => {
  const product = {
    externalId: rawProduct.id,
    name: rawProduct.nombre,
    countInStock: rawProduct.stock,
    price: rawProduct.precio,
  };

  return product;
};

async function transformEventHandler(db, fullDocument) {
  const product = transform(fullDocument);
  delete product._id;
  const productCollection = db.collection("products");

  return productCollection.updateOne(
    { externalId: product.externalId },
    { $set: product },
    { upsert: true }
  );
}

const convertCsvToTsv = (csvFilePath, tsvFilePath, callback) => {
  fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo CSV:", err);
      return;
    }

    const tsvData = data.replace(/;/g, "\t");

    fs.writeFile(tsvFilePath, tsvData, "utf8", (err) => {
      if (err) {
        console.error("Error escribiendo el archivo TSV:", err);
        return;
      }

      console.log("El archivo CSV ha sido convertido a TSV correctamente.");
      callback();
    });
  });
};

const importToMongo = async (db) => {
  const escapedFilePath = tsvFilePath.replace(/\\/g, "\\\\");
  const backupDir = await newBackupFolder();
  // Copiar el archivo CSV al directorio de backup
  const csvBackupPath = path.join(backupDir, "ARTICULOS.csv");
  fs.copyFileSync(csvFilePath, csvBackupPath);

  //Hago dos mongodump porque no me funcionaba el && en una sola linea para las dos colecciones
  exec(
    `mongodump --uri "${dbURL}" --db=ohmyveggie --collection=external-products --out "${backupDir}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Hubo un error: ", error.message);
        return;
      }
      if (stderr) {
        console.error("Hubo un error: ", stderr);
        return;
      }
      console.log("Todo Ok, stdout: ", stdout);
    }
  );
  exec(
    `mongodump --uri "${dbURL}" --db=ohmyveggie --collection=products --out "${backupDir}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Hubo un error: ", error.message);
        return;
      }
      if (stderr) {
        console.error("Hubo un error: ", stderr);
        return;
      }
      console.log("Todo Ok, stdout: ", stdout);
    }
  );

  await db.collection("external-products").deleteMany({});

  exec(
    `mongoimport --uri "${dbURL}${dbNAME}" --collection external-products --type tsv --headerline --file "${escapedFilePath}" --upsert --upsertFields id`,
    async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar mongoimport: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log("Importación completada.");

      const extProducts = await db
        .collection("external-products")
        .find({})
        .toArray();

      const updatePromises = extProducts.map((element) =>
        transformEventHandler(db, element)
      );

      await Promise.all(updatePromises);

      const products = await db.collection("products").find({}).toArray();

      const extProductIds = new Set(
        extProducts
          .filter((product) => product.activo === "S")
          .map((prod) => prod.id)
      );

      const delThisProds = products
        .filter((p) => !extProductIds.has(p.externalId))
        .map((p) => p.externalId);

      const productsWhitDel = await db
        .collection("products")
        .deleteMany({ externalId: { $in: delThisProds } });

      console.log("con los borrados", productsWhitDel);
    }
  );
};

const handleFileChange = async (db, curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log("\nEl archivo", csvFilePath, "fue modificado!");
    convertCsvToTsv(csvFilePath, tsvFilePath, () => importToMongo(db));
  }
};

(async () => {
  const client = new MongoClient(dbURL, { monitorCommands: true });
  await client.connect();
  const db = client.db(dbNAME);

  fs.watchFile(csvFilePath, { interval: 10000 }, (curr, prev) => {
    handleFileChange(db, curr, prev);
  });

  console.log(`Observando cambios en el archivo ${csvFilePath}`);
  console.log("Presiona Ctrl+C para salir.");
})();
