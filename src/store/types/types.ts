export interface Wether {
    current:{
        temp_c:number;
        condition:{
            icon:string
        }
    }
}