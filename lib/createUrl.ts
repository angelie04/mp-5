"use server";
import { ShortUrl } from "@/types";
import getCollection from "@/db";

const COLLECTION_NAME = "urls";

export default async function createUrl(
    alias: string,
    url: string,
): Promise<ShortUrl | null> {
    const newUrl = {
        alias,
        url,
    };
    const collection = await getCollection(COLLECTION_NAME);

   // check for duplicate alias
    const duplicate = await collection.findOne({ alias });
    if (duplicate) {
        throw new Error("Alias already taken");
    }
    // check for validation of url
    try {
        new URL(url);
    } catch {
        throw new Error("Invalid URL");
    }
    // similar to lab syntax
    const res = await collection.insertOne(newUrl);

    if(!res.acknowledged){
        return null;
    }
    return {
        ...newUrl,
        id: res.insertedId.toHexString(),
    };
}