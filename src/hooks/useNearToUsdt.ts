import axios from "axios";
import * as React from "react";

export default function useNearToUsdt() {
  const [priceUsdt, setPriceUsdt] = React.useState(0);

  React.useEffect(() => {
    const fetchCurrencyPrice = async () => {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd",
        )
        .then((res) => {
          setPriceUsdt(res.data.near.usd);
        });
    };
    fetchCurrencyPrice();
  }, []);
  return { priceUsdt };
}
