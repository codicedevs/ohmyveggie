import { ChangeStreamInsertDocument, Db, Document, MongoClient } from "mongodb"
import { Product } from "src/products/schemas/product.schema"

export const transform = (rawProduct: any): Product => {
    const product = new Product()
    product.externalId = rawProduct.id
    product.name = rawProduct.nombre
    product.brand = rawProduct.marca_nombre
    product.countInStock = rawProduct.stock
    product.category = rawProduct.categoria_nombre
    product.price = rawProduct.precio
    return product
}

async function transformEventHandler(db: Db, event: ChangeStreamInsertDocument<Document>) {
    const product = transform(event.fullDocument)
    const productCollection = db.collection('products')
    return productCollection.updateOne({ externalId: product.externalId }, //Operadores de MongoDB
        { $set: product },
        { upsert: true })
}

export async function attachTransformEventHandler() {
    const client = new MongoClient(process.env.MONGODB_URL, { monitorCommands: true });
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE_NAME);
    const collection = db.collection('external-products')
    // Establece un Change Stream en la colección, escucha los cambios en la coleccion
    const changeStream = collection.watch();
    changeStream.on('change', async (event) => {
        if (event.operationType === "insert") {
            await transformEventHandler(db, event)
        }
    });
}

