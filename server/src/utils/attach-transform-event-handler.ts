import { ChangeStreamInsertDocument, Db, Document, MongoClient } from "mongodb"
import { Product } from "src/products/schemas/product.schema"
import { serverSetting } from "src/settings"

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

async function transformEventHandler(db: Db, event:any) {
    const product = transform(event.fullDocument)
    const productCollection = db.collection('products')
    return productCollection.updateOne({ externalId: product.externalId }, //Operadores de MongoDB
        { $set: product },
        { upsert: true })
}

export async function attachTransformEventHandler() {
    const client = new MongoClient(serverSetting.DB_URL, { monitorCommands: true });
    await client.connect();
    const db = client.db(serverSetting.DB_DATABASE);
    const collection = db.collection('external-products')
    // Establece un Change Stream en la colección, escucha los cambios en la coleccion
    const changeStream = collection.watch();
    changeStream.on('change', async (event) => {
        console.log('Evento recibido:', event);
        if (event.operationType === "insert" ) {
            await transformEventHandler(db, event);
        } else {
            await transformEventHandler(db, event);
            console.log('Evento de cambio recibido, pero sin documento completo:', event);
        }
    });
}

