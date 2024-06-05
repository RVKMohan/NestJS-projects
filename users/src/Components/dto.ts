export class Dto{
    category:string | undefined
    model:string | undefined
    childData:chilDdto[] | undefined
    constructor(
        category:string | undefined,
        model:string | undefined,
    childData:chilDdto[] | undefined
    ){
        this.category=category
        this.model=model
        this.childData = childData
        
    }

}
export class chilDdto{
    item:string | undefined
    itemprice: string | undefined
    constructor(
        item:string | undefined,
        itemprice: string | undefined
    )
    {
        this.item =item
        this.itemprice =itemprice
    }

}