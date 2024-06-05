export interface ParentDto{
    category: string;
    model: string;
    childData: ChildDto[];
}

export interface ChildDto{
    item: string;
    itemprice: string;
    
}