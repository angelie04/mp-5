import { ShortUrl } from "@/types";
import getCollection, {COLLECTION_NAME} from "@/db";


export default async function getUrlByAlias(
    alias: string
): Promise<ShortUrl | null> {
    const collection = await getCollection(COLLECTION_NAME);
    const data = await collection.findOne({ alias });

    if (data === null) {
        return null;
    }
    console.log ("getUrlByAlias", alias);
    return {
        // MongoDB stores _id, my app uses id
        id: data._id.toHexString(),
        alias: data.alias,
        url: data.url,
    };
}