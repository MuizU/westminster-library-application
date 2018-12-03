import {LibraryItem} from "./LibraryItem";

class Book extends LibraryItem {
    private _genre: string;
    private _author: string[];
    private _borrowedDate: Date;
    private _borrowed: boolean;



    get genre(): string {
        return this._genre;
    }

    set genre(value: string) {
        this._genre = value;
    }

    get author(): string[] {
        return this._author;
    }

    set author(value: string[]) {
        this._author = value;
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