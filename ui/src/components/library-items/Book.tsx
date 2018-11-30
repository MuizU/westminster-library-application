import {LibraryItem} from "./LibraryItem";

class Book extends LibraryItem {
    private static _count: number;
    private _genre: string;
    private _author: string;
    private _borrowedDate: Date;
    private _borrowed: boolean;
    private _borrowerName:string;
    private _returnedDate:Date

    public constructor(isbn: number, title: string, author: string,readerName:string, genre: string, dateBorrowed: Date,dateReturned:Date, isBorrowed: boolean) {
        super(isbn, title);
        this._author = author;
        this._genre = genre;
        this._borrowedDate = dateBorrowed;
        this._borrowed = isBorrowed;
        this._borrowerName = readerName;
        this._returnedDate = dateReturned
    }

    getGenre(): string {
        return this._genre;
    }

    static get count(): number {
        return this._count;
    }


    get returnedDate(): Date {
        return this._returnedDate;
    }

    set returnedDate(value: Date) {
        this._returnedDate = value;
    }

    get borrowerName(): string {
        return this._borrowerName;
    }

    set borrowerName(value: string) {
        this._borrowerName = value;
    }

    static set count(value: number) {
        this._count = value;
    }

    get genre(): string {
        return this._genre;
    }

    set genre(value: string) {
        this._genre = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    public item_type(): string {
        return "BOOK";
    }

   public get borrowed(): boolean {
        return this._borrowed;
    }

   public set borrowed(borrowed: boolean) {
        this._borrowed = borrowed;
    }

    get borrowedDate(): Date {
        return this._borrowedDate;
    }

    set borrowedDate(borrowedDate: Date) {
        this._borrowedDate = borrowedDate;
    }
}

export default Book;