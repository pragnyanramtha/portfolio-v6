"use client";

import { useEffect } from "react";

export default function SuppressHydrationWarnings() {
    useEffect(() => {
        // Suppress hydration warnings caused by browser extensions like Dark Reader
        const originalError = console.error;
        console.error = (...args) => {
            const errorMessage = args[0]?.toString() || "";

            // Check if the error is related to Dark Reader or similar extensions
            if (
                errorMessage.includes("data-darkreader") ||
                errorMessage.includes("--darkreader") ||
                errorMessage.includes("Hydration failed") &&
                (errorMessage.includes("data-darkreader") || errorMessage.includes("--darkreader"))
            ) {
                // Suppress these specific errors
                return;
            }

            // Log all other errors normally
            originalError.apply(console, args);
        };

        return () => {
            // Restore original console.error on cleanup
            console.error = originalError;
        };
    }, []);

    return null;
}
