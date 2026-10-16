export interface Destination {
  id: string;
  name: string;
  displayTitle: string;
  subtitle: string;
  slogan: string;
  region: string;
  heroImage: string;
  cardImage: string;
  overview: string;
  highlights: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  destination: string;
  dates: string;
  guests: string;
  notes: string;
}
