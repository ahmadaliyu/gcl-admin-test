type TWebsiteCard = {
  country?: string;
  title?: string;
  description?: string;
  likes?: string;
  views?: string;
  underReview?: boolean;
  url?: string;
};
export const DEF_CARD: TWebsiteCard = {
  title: 'Oyster',
  description: 'Hire Anywhere, Thrive Everywhere',
  likes: '1.2k',
  views: '22k',
  underReview: false,
  url: '/sites/single-website',
};

export const DEF_CARD_UNDER_REVIEW: TWebsiteCard = {
  title: 'Oyster',
  description: 'Hire Anywhere, Thrive Everywhere',
  likes: '1.2k',
  views: '22k',
  underReview: true,
  url: '/sites/single-website',
};
