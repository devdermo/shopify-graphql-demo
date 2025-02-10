export function formatPrice(amount, currency, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(amount);
}
