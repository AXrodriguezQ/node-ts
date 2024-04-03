// ? External dependencies
import { ObjectId } from "mongodb";

// ? Class implementation
export default class Game {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}