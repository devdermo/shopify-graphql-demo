import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { GET_PRODUCTS } from "../graphql/queries.js";
import { formatPrice } from "./formatPrice.js";
const client = createStorefrontApiClient({
    storeDomain: process.env.DOMAIN,
    apiVersion: process.env.STOREFRONT_API_VERSION,
    publicAccessToken: process.env.STOREFRONT_TOKEN,
});
export async function fetchAndDisplayProducts(searchTerm) {
    const { data, errors } = await client.request(GET_PRODUCTS, {
        variables: {
            productsFirst: 99,
            variantsFirst: 99,
            query: `title:${searchTerm}`,
        },
    });
    if (errors) {
        console.error("Error fetching products:", errors);
        throw new Error("Error fetching products");
    }
    const sortedVariants = data.products.edges
        .flatMap((product) => product.node.variants.edges.map(({ node: variant }) => ({
        productTitle: product.node.title,
        variantTitle: variant.title,
        price: variant.price,
    })))
        .toSorted((a, b) => a.price.amount - b.price.amount);
    sortedVariants.forEach((variant) => {
        console.log(`${variant.productTitle} - ${variant.variantTitle} - price ${formatPrice(variant.price.amount, variant.price.currencyCode)}`);
    });
}
