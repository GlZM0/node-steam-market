import axios from "axios";

interface ItemDetail {
  name: string;
  price: number;
  imageURL: string;
}

async function fetchCSGOItems(): Promise<ItemDetail[]> {
  const url =
    "https://steamcommunity.com/market/search/render/?appid=730&norender=1";

  try {
    const response = await axios.get(url);

    if (response.data && response.data.results) {
      const itemDetails: ItemDetail[] = response.data.results.map(
        (item: any) => ({
          name: item.name,
          price: parseFloat(
            item.sell_price_text.replace("$", "").replace(",", "")
          ),
          imageURL: `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`,
        })
      );
      return itemDetails;
    } else {
      console.error("No results found in the response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching CS:GO items:", error);
    return [];
  }
}

async function main() {
  const csgoItems = await fetchCSGOItems();
  console.log("CS:GO Items:", csgoItems);
}

main();
