import { useCallback } from "react";
import { useApi } from "@shopify/ui-extensions-react/point-of-sale";
import { config } from "../../../../config";

export const useShopifyApi = () => {
  const api = useApi<"pos.home.modal.render">();

  console.log("api", api)

  const shopifyApi = useCallback(
    async ({ query, variables }: { query: string; variables: any }) => {
      // Using Shopify Admin GraphQL API directly
      const data = await fetch(`https://${api.session.currentSession.shopDomain}/admin/api/2025-04/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": config.ShopifyAccessToken
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }).then((res) => res.json());

      return data;
    },
    [api.session.currentSession.shopDomain]
  );

  return { shopifyApi };
};
