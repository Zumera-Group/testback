export interface Office {
  _id: string;
  _lang: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  phoneNumber: string;
  country: string;
  isCDINetwork: boolean;
  continentName: {
    name: string;
  };
  calendlyLink: string;
  hidePage: boolean;
}
