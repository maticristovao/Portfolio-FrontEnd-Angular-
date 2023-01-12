export interface Person{
    name:string,
    title:string|string[],
    location:string,
    phone:{
        number:number,
        type:string
    }
}