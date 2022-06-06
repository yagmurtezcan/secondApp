export default interface Product {
    id: number,
    product_name: string,
    product_price: number,
    product_quantity: number,
    is_active: boolean,
    is_deleted: boolean,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
    base64_image: string
}