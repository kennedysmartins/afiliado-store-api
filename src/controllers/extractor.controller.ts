import { extractDefaultMetadata } from "../lib/extractors/default"
import { MetadataResult } from "../lib/types"

//receive a object with url
export const extractMetadata = async ({
  url,
}: {
  url: string;
}): Promise<MetadataResult | undefined> => {
  console.log("♦ Extraindo...");
  try {
    return await extractDefaultMetadata(url);
  } catch (error: any) {
    console.error("Erro ao extrair metadados:", error);
  }
}



