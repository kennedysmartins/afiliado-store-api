export interface MetadataResult {
  website?: string
  title?: string
  conditionPayment?: string
  currentPrice?: string
  recurrencePrice?: string
  originalPrice?: string
  buyLink?: string
  productCode?: string
  image?: string
}


export interface OGSResult {
  ogImage: { url: string }[];
  ogTitle: string;
  ogDescription: string;
  // Adicione outras propriedades conforme necessário.
}
