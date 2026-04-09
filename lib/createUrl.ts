"use server";
import { ShortUrl } from "@/types";
import getCollection, {COLLECTION_NAME} from "@/db";

export default async function createUrl(
    alias: string,
    url: string,
): Promise<ShortUrl | null | string> {
    const newUrl = {
        alias,
        url,
    };
    const collection = await getCollection(COLLECTION_NAME);

    // check for validation of url (had to swap these error handles to check for invalid url first)
    try {
        new URL(url);
    } catch {
        //throw new Error ("Invalid URL")
        return "Invalid URL";
    }
   // check for duplicate alias
    const duplicate = await collection.findOne({ alias });
    if (duplicate) {
        // throw new Error ("Alias already taken")
        return "Alias already taken";
    }
    // broke url string into parts, origin is the base of the website, ie. https://mp-5-pi-five.vercel.app
    const p = new URL(url);
    if (p.origin === "https://mp-5-pi-five.vercel.app" || p.origin === "https://mp-5-pi-five.vercel.app/" ) {
        return "Something went wrong, try again!"
    }

    // similar to lab syntax
    const res = await collection.insertOne(newUrl);

    if(!res.acknowledged){
         return null;
        //return "acknowledged";
    }
        console.log("URL RECEIVED:", newUrl.url);
        console.log ("alias:", newUrl.alias);
    return {
        // ...newUrl,
        // id: res.insertedId.toHexString(),
        alias: newUrl.alias,
        url: newUrl.url,
        id: res.insertedId.toHexString(),

    };

}