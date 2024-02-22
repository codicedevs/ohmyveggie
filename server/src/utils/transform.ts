import { Product } from "src/products/schemas/product.schema"

const transform = (rawProduct: any): Product => {
    const product = new Product()
    product.externalId = rawProduct.id
    product.name = rawProduct.nombre
    product.brand = rawProduct.marca_nombre
    product.countInStock = rawProduct.stock
    product.category = rawProduct.categoria_nombre
    product.price = rawProduct.precio
    return product
}
export default transform