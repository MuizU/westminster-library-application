import {LibraryItem} from "./LibraryItem";

class DVD extends LibraryItem {
    private _director: string;
    private _genre: string;
    private _borrowedDate: Date;
    private _borrowed: boolean;
    private _borrowerName:string;
    private _returnedDate:Date;







    get returnedDate(): Date {
        return this._returnedDate;
    }

    set returnedDate(value: Date) {
        this._returnedDate = value;
    }



    public get director(): string {
        return this._director;
    }

    public set director(value: string) {
        this._director = value;
    }

    get borrowerName(): string {
        return this._borrowerName;
    }

    set borrowerName(value: string) {
        this._borrowerName = value;
    }

    public get genre(): string {
        return this._genre;
    }

    public set genre(value: string) {
        this._genre = value;
    }


    public get borrowed(): boolean {
        return this._borrowed;
    }

    public set borrowed(borrowed: boolean) {
        this._borrowed = borrowed;
    }

    public get borrowedDate(): Date {
        return this._borrowedDate;
    }

    public set borrowedDate(borrowedDate: Date) {
        this._borrowedDate = borrowedDate;
    }
}

export default DVD;