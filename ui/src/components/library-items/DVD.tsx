import {LibraryItem} from "./LibraryItem";

class DVD extends LibraryItem {
    private static _count: number;
    private _director: string;
    private _genre: string;
    private _borrowedDate: Date;
    private _borrowed: boolean;
    private _borrowerName:string;
    private _returnedDate:Date

    public constructor(isbn: number, title: string, director: string, genre: string,borrowerName:string, dateBorrowed: Date,dateReturned:Date, borrowed: boolean) {
        super(isbn, title);
        this._director = director;
        this._genre = genre;
        this._borrowedDate = dateBorrowed;
        this._borrowed = borrowed;
        this._borrowerName = borrowerName;
        this._returnedDate=dateReturned;
    }

    public getGenre(): string {
        return this._genre;
    }

    get borrowerName(): string {
        return this._borrowerName;
    }

    set borrowerName(value: string) {
        this._borrowerName = value;
    }

    public static get count(): number {
        return this._count;
    }


    get returnedDate(): Date {
        return this._returnedDate;
    }

    set returnedDate(value: Date) {
        this._returnedDate = value;
    }

    public static set count(value: number) {
        this._count = value;
    }

    public get director(): string {
        return this._director;
    }

    public set director(value: string) {
        this._director = value;
    }

    public get genre(): string {
        return this._genre;
    }

    public set genre(value: string) {
        this._genre = value;
    }

    public item_type(): string {
        return "DVD";
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