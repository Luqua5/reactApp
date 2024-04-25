export type User = {
    "uid":string,
    "email":string,
}

export type Rating={
    "rate": number,
    "count": number
}
export type Product={
    "id": number,
    "title": string
    "price": number,
    "description":string
    "category":string
    "image": string
    "rating": Rating
}
export type ProductInCart={
    "id": number,
    "title": string
    "price": number,
    "description":string
    "category":string
    "image": string
    "rating": Rating
    "quantity": number
}

export type Cart={
    "idUser": string,
    "products": ProductInCart[]
}