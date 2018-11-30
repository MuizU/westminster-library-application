
export abstract class LibraryItem {
   private _isbn:number;
    private _title:string;
    protected constructor(isbn:number,title:string ){
        this._isbn=isbn;
        this._title=title;
    }
    protected abstract getGenre():string;

    get isbn(): number {
        return this._isbn;
    }

    set isbn(value: number) {
        this._isbn = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
    abstract get borrowedDate():Date;
    abstract set borrowedDate(value:Date);
    abstract get returnedDate():Date;
    abstract set returnedDate(value:Date);


}

