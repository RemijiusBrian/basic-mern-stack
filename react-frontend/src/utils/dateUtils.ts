export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
    return new Date(dateString).toLocaleString("en-US", options);
}