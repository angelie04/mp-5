import getUrlByAlias from "@/lib/getUrl";
import { redirect } from "next/navigation";

// interface PageProps {
//     // params: {
//     //     alias: string;
//     // };
//
// }
type PageProps = {
    params: Promise<{ alias: string }>;
};

export default async function AliasPage({ params }: PageProps) {
    const { alias } = await params;
    const data = await getUrlByAlias(alias);

    if (!data) {
        return <h1 className="text-center mt-20 text-red-500">Alias not found 😢</h1>;
    }

    // Redirect immediately
    redirect(data.url);
}