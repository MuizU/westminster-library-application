
export abstract class LibraryItem {
   public _isbn:number;
    public _title:string;

   public get isbn(): number {
        return this._isbn;
    }

    public set isbn(value: number) {
        this._isbn = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }
    abstract get borrowedDate():Date;
    abstract set borrowedDate(value:Date);



}

