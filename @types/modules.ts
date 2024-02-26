export interface IImagesWithHeaderAndTextModuleColumn {
	title?: string;
	image?: Record<string, any>;
	textBlocks?: Record<string, any>[];
}

export type SanityNumberValueType = 'number' | 'EUR' | 'USD' | 'currency' | 'year' | 'age' | 'percent';