import { ListProductImage } from "./list_product_image"

export class ListProduct{
    id:string
    name:string
    stock:number
    price:number
    createDate:Date
    updateDate:Date
    productImageFiles?: ListProductImage[]
    imagePath: string
}