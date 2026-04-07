import { ShortUrl } from "@/types";
import getCollection, {COLLECTION_NAME} from "@/db";

// const COLLECTION_NAME = "urls";
// interface PageProps {
//     params: {
//         alias: string;
//     };
// }
export default async function getUrlByAlias(
    alias: string
): Promise<ShortUrl | null> {

// export default async function getUrlByAlias({ params }: PageProps){
//     const {alias} = await params; //added by professor

    const collection = await getCollection(COLLECTION_NAME);
    const data = await collection.findOne({ alias });

    if (data === null) {
        return null;
    }

    return {
        // MongoDB stores _id, my app uses id
        id: data._id.toHexString(),
        alias: data.alias,
        url: data.url,
    };
}