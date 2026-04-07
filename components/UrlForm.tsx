"use client";
import createUrl from "@/lib/createUrl";
import { ShortUrl } from "@/types";
import {Button, FormHelperText, TextField} from "@mui/material";
import { useState } from "react";

export default function NewShortUrlForm({
                                            onCreate,
                                        }: {
    onCreate?: (newUrl: ShortUrl) => void;
}) {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [shortLink, setShortLink] = useState("");

    return (
        <form
            className="w-200 h-120 rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: "#f1b6d9" }}
            onSubmit={(e) => {
                e.preventDefault();
                setError("");

                createUrl(alias, url)
                    .then((p) => {
                        if (!p) return;

                        const generatedLink = `https://mp-5-pi-five.vercel.app/${p.alias}`;
                        setShortLink(generatedLink);

                        if (onCreate) onCreate(p);

                        // clear inputs
                        setAlias("");
                        setUrl("");
                    })
                    .catch((err) => {
                        setError(err.message);
                    });
            }}
        >
            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-4 text-pink-600">
                Create a Short Link
            </h2>

            {/* URL */}
            <TextField
                variant="filled"
                label="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                sx={{ backgroundColor: "white", width: "100%", mb: 3 }}
            />
            {/* Alias */}
            <TextField
                variant="filled"
                label="Custom Alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                sx={{ backgroundColor: "white", width: "100%", mb: 3 }}
            />

            <FormHelperText>
                Enter a long URL to create a shorter, shareable link
            </FormHelperText>

            {/* Error message */}
            {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            {/* Submit */}
            <div className="w-full flex justify-center mt-12">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: "#ec4899",
                        borderRadius: "20px",
                        px: 3,
                    }}
                >
                    Shorten
                </Button>
            </div>

            {/* Result Link */}
            {shortLink && (
                <div className="mt-4 text-center">
                    <p className="text-pink-700 text-sm mb-1 font-bold">Your link:</p>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            className="border rounded px-2 py-1 text-sm w-64"
                            value={shortLink}
                            readOnly
                        />
                        <Button
                            size="small"
                             // added feature to be able to  copy link to your clipboard
                            onClick={() => navigator.clipboard.writeText(shortLink)}
                            sx={{ color: "#ec4899", fontWeight: 'bold'}}
                        >
                            Copy
                        </Button>
                    </div>
                </div>

            )}
        </form>

    );
}