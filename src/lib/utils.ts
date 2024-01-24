import ogs from "open-graph-scraper"
import { OGSResult } from "./types"


export const formatPrice = (currentPrice: string) => {
  if (typeof currentPrice === "string") {
    let priceWithoutSymbol = currentPrice.replace(/^R\$\s?/, "")

    if (priceWithoutSymbol.includes(",") && priceWithoutSymbol.includes(".")) {
      priceWithoutSymbol = priceWithoutSymbol.replace(/\./g, "")
      priceWithoutSymbol = priceWithoutSymbol.replace(/\,/g, ".")
    } else {
      priceWithoutSymbol = priceWithoutSymbol.replace(/\,/g, ".")
    }

    if (
      priceWithoutSymbol.split(".").length === 2 &&
      priceWithoutSymbol.split(".")[1].length === 3
    ) {
      priceWithoutSymbol = priceWithoutSymbol.replace(/\./g, "")
    }
    parseFloat(priceWithoutSymbol)

    return priceWithoutSymbol
  }
  return currentPrice
}

export const extractOG = async (
  url: string
): Promise<{ metadata?: OGSResult; error?: string }> => {
  const data = await ogs({
    url: url,
    fetchOptions: {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    },
  })

  const { error, result: ogsResult } = data

  return ogsResult
}
