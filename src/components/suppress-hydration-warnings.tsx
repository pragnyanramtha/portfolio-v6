"use client";

import { useEffect } from "react";

export default function SuppressHydrationWarnings() {
    useEffect(() => {
        // Suppress hydration warnings caused by browser extensions like Dark Reader
        const originalError = console.error;
        const originalWarn = console.warn;

        console.error = (...args) => {
            const fullMessage = args.join(" ");

            // Check if the error is related to Dark Reader or similar extensions
            if (
                fullMessage.includes("data-darkreader") ||
                fullMessage.includes("--darkreader-inline") ||
                fullMessage.includes("darkreader") ||
                (fullMessage.includes("A tree hydrated but some attributes") &&
                    fullMessage.includes("darkreader"))
            ) {
                // Suppress these specific errors
                return;
            }

            // Log all other errors normally
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            const fullMessage = args.join(" ");

            // Suppress Dark Reader related warnings
            if (
                fullMessage.includes("data-darkreader") ||
                fullMessage.includes("--darkreader") ||
                fullMessage.includes("darkreader")
            ) {
                return;
            }

            originalWarn.apply(console, args);
        };

        return () => {
            // Restore original console methods on cleanup
            console.error = originalError;
            console.warn = originalWarn;
        };
    }, []);

    return null;
}
