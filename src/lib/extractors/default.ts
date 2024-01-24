import { extractOG } from "../utils";
import { MetadataResult } from "../types";

export const extractDefaultMetadata = async (
  url: string
): Promise<MetadataResult> => {
  console.log("DefaultMetadata");
  let result: MetadataResult = {};

  try {
    const ogsResult: any = await extractOG(url);

    if (ogsResult) {
      if (ogsResult.ogImage) {
        result.image = ogsResult.ogImage[0].url;
      }
      result.title = ogsResult.ogTitle;
      result.buyLink = "";
      result.originalPrice = "";
      result.currentPrice = "";
      result.productCode = "";
      result.conditionPayment = "";
      result.website = "";

      console.log("Extraído com sucesso");
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};
