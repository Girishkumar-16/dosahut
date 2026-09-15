// Central place for anything that might change — copy, links, hours.

export const SITE = {
  name: "Dosa Hut Sunshine Coast",
  orderUrl: "https://sunshinecoast.dosahut.net.au/",
  menuPdfUrl:
    "https://www.dosahut.net.au/wp-content/uploads/2026/06/DosaHut_Menu-sunshine-coast-9-10-2025.pdf",
  phoneDisplay: "0423 841 991",
  phoneHref: "tel:+61423841991",
  addressLine1: "5 Lutana Street",
  addressLine2: "Buddina, QLD 4575",
  addressFull: "5 Lutana Street, Buddina QLD 4575",
  // Exact listing coordinates. Used for the directions link so it resolves
  // without the maps.app.goo.gl shortener's extra redirect hop.
  lat: -26.7052761,
  lng: 153.1306377,
  placeUrl:
    "https://www.google.com/maps/place/Dosa+Hut+Indian+Restaurant+Sunshine+Coast/@-26.7052761,153.1306377,17z",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-26.7052761,153.1306377",
  mapEmbedUrl:
    "https://www.google.com/maps?q=5+Lutana+St+Buddina+QLD+4575&z=17&output=embed",
  mainSiteUrl: "https://www.dosahut.net.au/",
  // Verified live; the main site has no privacy policy page, so the footer
  // links only the sitemap.
  sitemapUrl: "https://www.dosahut.net.au/sitemap.html",
  // Canonical origin for this site. Set NEXT_PUBLIC_SITE_URL at build time to
  // the domain it is actually deployed on — the fallback is the ordering
  // domain the business currently points customers at.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunshinecoast.dosahut.net.au",
  ogImage: "/images/hero-banner.png",
  cateringUrl: "https://www.dosahut.net.au/catering/indian-catering-sunshine-coast/",
  instagramUrl: "https://www.instagram.com/dosahut_sunshinecoast/?hl=en",
  facebookUrl: "https://www.facebook.com/people/Dosa-Hut-Sunshine-Coast/61573654335879/",
  uberEatsUrl: "https://www.ubereats.com/au/store/dosa-hut-sunshine-coast/DWfGOBKaTI2wGq4K5eUU8A",
  doorDashUrl: "https://www.doordash.com/store/dosa-hut-sunshine-coast-buddina-34065779/69533746/",
};

// No "Location" entry — the "Find Your Coast" pin in the navbar already
// links to #location.
export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "Catering", href: "#catering" },
];

export const HOURS = [
  { day: "Mon – Thu", time: "11:00 am – 2:30 pm, 4:00 pm – 9:00 pm" },
  { day: "Fri – Sun", time: "11:00 am – 9:30 pm" },
];

export type Diet = "Veg" | "Non-Veg" | "Egg";
export type SpiceLevel = "Mild" | "Medium" | "Spicy";

// diet and spiceLevel are optional because they are only set where the real
// menu states them. Craving Finder filters strictly on these, so an untagged
// dish is intentionally unfilterable rather than guessed into a bucket.
export type Dish = {
  category: string;
  name: string;
  price: string;
  diet?: Diet;
  spiceLevel?: SpiceLevel;
  image?: string;
  alt?: string;
};

export const DISH_CATEGORIES = [
  "Dosa",
  "Biryani & More",
  "Tandoori Starters",
  "Vegetarian Curries",
  "Chicken Curries",
  "Indo-Chinese",
  "Goat & Lamb Curry",
] as const;

export function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export const DISHES: Dish[] = [
  // Dosa
  {
    category: "Dosa",
    name: "Masala Dosa",
    price: "$15.95",
    image: "/images/dish-masala-dosa.jpg",
    alt: "Crisp masala dosa served with a plate of accompaniments",
  },
  {
    category: "Dosa",
    name: "Paneer Dosa",
    price: "$16.95",
    image: "/images/dish-paneer-dosa.jpg",
    alt: "Paneer dosa filled with spiced cottage cheese",
  },
  {
    category: "Dosa",
    name: "Onion Dosa",
    price: "$10.95",
    image: "/images/dish-onion-dosa.jpg",
    alt: "Crisp onion dosa topped with onions",
  },

  {
    category: "Dosa",
    name: "Plain Dosa",
    price: "$8.95",
    image: "/images/dish-plain-dosa.jpg",
    alt: "Golden plain dosa served with chutneys and sambar",
  },
  {
    category: "Dosa",
    name: "Paper Dosa",
    price: "$8.95",
    image: "/images/dish-paper-dosa.jpg",
    alt: "Extra-thin paper dosa rolled tall on the plate",
  },
  {
    category: "Dosa",
    name: "Ghee Plain Dosa",
    price: "$9.95",
    image: "/images/dish-ghee-plain-dosa.jpg",
    alt: "Ghee-roasted plain dosa with chutneys and sambar",
  },
  {
    category: "Dosa",
    name: "Cheese & Chilli Dosa",
    price: "$15.95",
    image: "/images/dish-cheese-chilli-dosa.jpg",
    alt: "Cheese and chilli dosa with a melted cheese and green chilli filling",
  },
  {
    category: "Dosa",
    name: "Veg Dosa Chef Special",
    price: "$17.95",
    image: "/images/dish-vegetable-dosa.jpg",
    alt: "Dosa filled with a spiced mixed-vegetable masala",
  },
  {
    category: "Dosa",
    name: "Lamb Dosa",
    price: "$16.95",
    image: "/images/dish-lamb-dosa.jpg",
    alt: "Dosa filled with spiced minced lamb",
  },
  {
    category: "Dosa",
    name: "Rava Onion Dosa",
    price: "$16.95",
    image: "/images/dish-rava-onion-dosa.jpg",
    alt: "Lacy rava onion dosa scattered with onion and coriander",
  },
  {
    category: "Dosa",
    name: "Rava Masala Dosa",
    price: "$16.95",
    image: "/images/dish-rava-masala-dosa.jpg",
    alt: "Crisp rava masala dosa folded over a potato masala filling",
  },
  {
    category: "Dosa",
    name: "Rava Lamb Dosa",
    price: "$18.95",
    image: "/images/dish-rava-lamb-dosa.jpg",
    alt: "Rava dosa filled with spiced lamb",
  },

  // Biryani & More
  {
    category: "Biryani & More",
    name: "Chicken 65 Biryani",
    price: "$20.95",
    image: "/images/dish-chicken-65-biryani.jpg",
    alt: "Chicken 65 biryani served in a copper handi with raita and curry on the side",
  },
  {
    category: "Biryani & More",
    name: "Chicken Dum Biryani",
    price: "$19.95",
    image: "/images/dish-chicken-dum-biryani.jpg",
    alt: "Chicken dum biryani thali with raita, curry, onion and lemon",
  },
  {
    category: "Biryani & More",
    name: "Vegetarian Dum Biryani",
    price: "$18.95",
    image: "/images/dish-vegetarian-dum-biryani.jpg",
    alt: "Vegetarian dum biryani with assorted vegetables and basmati rice",
  },

  // Tandoori Starters
  {
    category: "Tandoori Starters",
    name: "Chicken Tikka",
    price: "$18.95",
    image: "/images/dish-chicken-tikka.jpg",
    alt: "Tandoori-grilled chicken tikka skewers with onion, coriander and lemon",
  },
  {
    category: "Tandoori Starters",
    name: "Paneer Tikka",
    price: "$16.95",
    image: "/images/dish-paneer-tikka.jpg",
    alt: "Tandoori-grilled paneer tikka skewers",
  },
  {
    category: "Tandoori Starters",
    name: "Tandoori Chicken (Half)",
    price: "$18.95",
    image: "/images/dish-tandoori-chicken-half.jpg",
    alt: "Tandoori roasted chicken pieces with lemon and onion",
  },

  // Vegetarian Curries
  {
    category: "Vegetarian Curries",
    name: "Dal Makhani",
    price: "$20.95",
    image: "/images/dish-dal-makhani.jpg",
    alt: "Creamy dal makhani made with black lentils and kidney beans",
  },
  {
    category: "Vegetarian Curries",
    name: "Paneer Butter Masala",
    price: "$20.95",
    image: "/images/dish-paneer-butter-masala.jpg",
    alt: "Paneer butter masala in a rich tomato gravy",
  },
  {
    category: "Vegetarian Curries",
    name: "Palak Paneer",
    price: "$20.95",
    image: "/images/dish-palak-paneer.jpg",
    alt: "Palak paneer with soft paneer cubes in a spiced spinach gravy",
  },

  // Chicken Curries
  {
    category: "Chicken Curries",
    name: "Butter Chicken",
    price: "$22.95",
    image: "/images/dish-butter-chicken.jpg",
    alt: "Creamy butter chicken curry garnished with mint",
  },
  {
    category: "Chicken Curries",
    name: "Chicken Tikka Masala",
    price: "$22.95",
    image: "/images/dish-chicken-tikka-masala.jpg",
    alt: "Chicken tikka masala in a creamy tomato gravy",
  },
  {
    category: "Chicken Curries",
    name: "Chicken Madras",
    price: "$22.95",
    image: "/images/dish-chicken-madras.jpg",
    alt: "Dark, richly spiced Chicken Madras curry garnished with onion and lemon",
  },

  // Indo-Chinese
  {
    category: "Indo-Chinese",
    name: "Chicken 65",
    price: "$19.95",
    image: "/images/dish-chicken-65.jpg",
    alt: "Crispy Chicken 65 tossed with curry leaves, garlic and dry chillies",
  },
  {
    category: "Indo-Chinese",
    name: "Gobi 65",
    price: "$18.95",
    image: "/images/dish-gobi-65.jpg",
    alt: "Crispy fried Gobi 65 cauliflower florets",
  },
  {
    category: "Indo-Chinese",
    name: "Chilli Chicken",
    price: "$19.95",
    image: "/images/dish-chilli-chicken.jpg",
    alt: "Chilli chicken tossed with spring onion, peanuts and green chilli",
  },

  // Goat & Lamb Curry
  {
    category: "Goat & Lamb Curry",
    name: "Goat Curry",
    price: "$23.95",
    image: "/images/dish-goat-curry.jpg",
    alt: "Thick, dark, richly spiced goat curry",
  },
  {
    category: "Goat & Lamb Curry",
    name: "Goat Karahi",
    price: "$23.95",
    image: "/images/dish-goat-karahi.jpg",
    alt: "Goat karahi cooked with tomatoes and green chillies",
  },
  {
    category: "Goat & Lamb Curry",
    name: "Lamb Rogan Josh",
    price: "$24.95",
    image: "/images/dish-lamb-rogan-josh.jpg",
    alt: "Lamb rogan josh in a rich Kashmiri-style spiced gravy",
  },
];

// The full priced dosa menu, with the diet and spice level each item is
// actually listed with. DISHES above stays a curated, photographed "top 3"
// per category for the showcase carousel; this is the complete list the
// Craving Finder filters over, so the two overlap by design on the three
// photographed dosas.
export const DOSA_MENU: Dish[] = [
    
  {
    category: "Dosa",
    name: "Plain Dosa",
    price: "$8.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-plain-dosa.jpg",
    alt: "Golden plain dosa served with chutneys and sambar",
  },
  {
    category: "Dosa",
    name: "Onion Dosa",
    price: "$10.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-onion-dosa.jpg",
    alt: "Crisp onion dosa topped with onions",
  },
  {
    category: "Dosa",
    name: "Masala Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-masala-dosa.jpg",
    alt: "Crisp masala dosa served with a plate of accompaniments",
  },
  {
    category: "Dosa",
    name: "Paper Dosa",
    price: "$8.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-paper-dosa.jpg",
    alt: "Extra-thin paper dosa rolled tall on the plate",
  },
  {
    category: "Dosa",
    name: "Ghee Plain Dosa",
    price: "$9.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-ghee-plain-dosa.jpg",
    alt: "Ghee-roasted plain dosa with chutneys and sambar",
  },
  {
    category: "Dosa",
    name: "Ghee Podi Dosa",
    price: "$9.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-ghee-podi-dosa.jpg",
    alt: "Ghee-roasted podi dosa dusted with spiced lentil chutney powder",
  },
  {
    category: "Dosa",
    name: "Paneer Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-paneer-dosa.jpg",
    alt: "Paneer dosa filled with spiced cottage cheese",
  },
  {
    category: "Dosa",
    name: "Mysore Masala Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-mysore-masala-dosa.jpg",
    alt: "Mysore masala dosa with a spiced red chutney spread inside",
  },
  {
    category: "Dosa",
    name: "Cheese & Chilli Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-cheese-chilli-dosa.jpg",
    alt: "Cheese and chilli dosa with a melted cheese and green chilli filling",
  },
  {
    category: "Dosa",
    name: "Chicken Dosa",
    price: "$16.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    image: "/images/dish-chicken-dosa.jpg",
    alt: "Dosa filled with spiced shredded chicken",
  },
  {
    category: "Dosa",
    name: "Chicken 65 Dosa",
    price: "$16.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-chicken-65-dosa.jpg",
    alt: "Dosa filled with crispy Chicken 65",
  },
  {
    category: "Dosa",
    name: "Lamb Dosa",
    price: "$16.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    image: "/images/dish-lamb-dosa.jpg",
    alt: "Dosa filled with spiced minced lamb",
  },
  {
    category: "Dosa",
    name: "Veg Dosa Chef Special",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-vegetable-dosa.jpg",
    alt: "Dosa filled with a spiced mixed-vegetable masala",
  },
  {
    category: "Dosa",
    name: "Non-Veg Dosa Chef Special",
    price: "$17.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    image: "/images/dish-non-veg-dosa-chef-special.jpg",
    alt: "Non-veg dosa chef special filled with a spiced meat masala",
  },
  {
    category: "Rava Dosa",
    name: "Rava Plain Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-plain-dosa.jpg",
    alt: "Lacy rava plain dosa served with chutneys and sambar",
  },
  {
    category: "Rava Dosa",
    name: "Rava Onion Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-onion-dosa.jpg",
    alt: "Lacy rava onion dosa scattered with onion and coriander",
  },
  {
    category: "Rava Dosa",
    name: "Rava Masala Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-masala-dosa.jpg",
    alt: "Crisp rava masala dosa folded over a potato masala filling",
  },
  {
    category: "Rava Dosa",
    name: "Rava Paneer Dosa",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-paneer-dosa.jpg",
    alt: "Rava dosa filled with spiced cottage cheese",
  },
  {
    category: "Rava Dosa",
    name: "Rava Chicken Dosa",
    price: "$18.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    // Reusing the Chicken Dosa photo — no distinct Rava Chicken Dosa shot
    // has been supplied yet.
    image: "/images/dish-chicken-dosa.jpg",
    alt: "Dosa filled with spiced shredded chicken",
  },
  {
    category: "Rava Dosa",
    name: "Rava Lamb Dosa",
    price: "$18.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-lamb-dosa.jpg",
    alt: "Rava dosa filled with spiced lamb",
  },
  {
    category: "Uttapam",
    name: "Onion Uttapam",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-onion-uttapam.jpg",
    alt: "Onion uttapam topped with chopped onions",
  },
  {
    category: "Uttapam",
    name: "Onion & Chilli Uttapam",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-onion-uttapam.jpg",
    alt: "Onion uttapam topped with chopped onions and green chillies",
  },
];

// The full priced biryani menu. Nothing in this section is Mild — the real
// menu starts at one chilli — so the Craving Finder only ever offers Medium
// and Spicy on this tab.
export const BIRYANI_MENU: Dish[] = [
  
  {
    category: "Biryani & More",
    name: "Vegetarian Dum Biryani",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-vegetarian-dum-biryani.jpg",
    alt: "Vegetarian dum biryani with assorted vegetables and basmati rice"
  },
  {
    category: "Biryani & More",
    name: "Gobi 65 Biryani",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-gobi-65-biryani.jpg",
    alt: "Gobi 65 biryani topped with crispy fried cauliflower"
  },
  {
    category: "Biryani & More",
    name: "Soya Chaap Tikka Biryani",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-soya-chaap-tikka-biryani.jpg",
    alt: "Soya chaap tikka biryani with grilled soya chaap pieces"
  },
  {
    category: "Biryani & More",
    name: "Paneer 65 Biryani",
    price: "$19.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-paneer-65-biryani.jpg",
    alt: "Paneer 65 biryani topped with crispy fried paneer"
  },
  {
    category: "Biryani & More",
    name: "Paneer Tikka Biryani",
    price: "$19.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-paneer-tikka-biryani.jpg",
    alt: "Paneer tikka biryani with grilled paneer tikka pieces"
  },

  // EGG BIRYANIS
  {
    category: "Biryani & More",
    name: "Egg Biryani",
    price: "$18.95",
    diet: "Egg",
    spiceLevel: "Medium",
    image: "/images/dish-egg-biryani.jpg",
    alt: "Egg biryani topped with boiled egg halves"
  },
  {
    category: "Biryani & More",
    name: "Egg 65 Biryani",
    price: "$18.95",
    diet: "Egg",
    spiceLevel: "Spicy",
    image: "/images/dish-egg-65-biryani.jpg",
    alt: "Egg 65 biryani topped with crispy fried egg 65"
  },

  // NON-VEGETARIAN BIRYANIS (CHICKEN, SEAFOOD, MEAT)
  {
    category: "Biryani & More",
    name: "Chicken Dum Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-chicken-dum-biryani.jpg",
    alt: "Chicken dum biryani thali with raita, curry, onion and lemon"
  },
  {
    category: "Biryani & More",
    name: "Chicken 65 Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-chicken-65-biryani.jpg",
    alt: "Chicken 65 biryani served in a copper handi with raita and curry on the side"
  },
  {
    category: "Biryani & More",
    name: "Ghee Chicken Roast Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Medium",
    image: "/images/dish-ghee-chicken-roast-biryani.jpg",
    alt: "Ghee chicken roast biryani with ghee-roasted chicken pieces"
  },
  {
    category: "Biryani & More",
    name: "Chicken Tikka Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Medium",
    image: "/images/dish-chicken-tikka-biryani.jpg",
    alt: "Chicken tikka biryani with grilled chicken tikka pieces"
  },
  {
    category: "Biryani & More",
    name: "Chicken Fry Piece Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-chicken-fry-piece-biryani.jpg",
    alt: "Chicken fry piece biryani with crispy fried chicken pieces"
  },
  {
    category: "Biryani & More",
    name: "Pacchi Mirchi Chicken Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-pacchi-mirchi-chicken-biryani.jpg",
    alt: "Pacchi mirchi chicken biryani with raw marinated chicken and green chillies"
  },
  {
    category: "Biryani & More",
    name: "Prawn Roast Biryani",
    price: "$21.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-prawn-roast-biryani.jpg",
    alt: "Prawn roast biryani with roasted prawns"
  },
  {
    category: "Biryani & More",
    name: "Special Keema Pulao",
    price: "$21.95",
    diet: "Non-Veg",
    spiceLevel: "Medium",
    image: "/images/dish-special-keema-pulao.jpg",
    alt: "Special keema pulao with minced meat and fragrant rice"
  }

];

// The full priced curry menu. The printed menu lists these as one "Curries"
// section rather than splitting them the way DISH_CATEGORIES does for the
// showcase, so the whole section shares a single category here.
export const CURRY_MENU: Dish[] = [
{
category: "Curries",
name: "Dal Tadka",
price: "$18.50",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-dal-tadka.jpg",
alt: "Dal tadka finished with a tempering of ghee, cumin and curry leaves"
},
{
category: "Curries",
name: "Dal Makhani",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-dal-makhani.jpg",
alt: "Creamy dal makhani made with black lentils and kidney beans"
},
{
category: "Curries",
name: "Soya Chaap Tikka Masala",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-soya-chaap-tikka-masala.jpg",
alt: "Soya chaap tikka masala in a spiced tomato gravy"
},
{
category: "Curries",
name: "Paneer Tikka Masala",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-paneer-tikka-masala.jpg",
alt: "Paneer tikka masala in a spiced tomato gravy"
},
{
category: "Curries",
name: "Paneer Butter Masala",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-paneer-butter-masala.jpg",
alt: "Paneer butter masala in a rich tomato gravy"
},
{
category: "Curries",
name: "Palak Paneer",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-palak-paneer.jpg",
alt: "Palak paneer with soft paneer cubes in a spiced spinach gravy"
},
{
category: "Curries",
name: "Paneer Pudina Kali Mirch",
price: "$19.95",
diet: "Veg",
spiceLevel: "Spicy",
image: "/images/dish-paneer-pudina-kali-mirch.jpg",
alt: "Paneer pudina kali mirch in a mint and black pepper gravy"
},
{
category: "Curries",
name: "Kadai Paneer",
price: "$19.95",
diet: "Veg",
spiceLevel: "Medium",
image: "/images/dish-kadai-paneer.jpg",
alt: "Kadai paneer cooked with peppers and onions in a kadai-style gravy"
},
{
category: "Curries",
name: "Veg Kolhapuri",
price: "$19.95",
diet: "Veg",
spiceLevel: "Medium",
image: "/images/dish-veg-kolhapuri.jpg",
alt: "Mixed vegetable Kolhapuri in a spicy, dark Kolhapuri-style gravy"
},
{
category: "Curries",
name: "Paneer Dhaniya Hara Pyaaz",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-paneer-dhaniya-hara-pyaaz.jpg",
alt: "Paneer dhaniya hara pyaaz in a coriander and onion gravy"
},
{
category: "Curries",
name: "Veg Korma",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-veg-korma.jpg",
alt: "Mixed vegetable korma in a mild, creamy gravy"
},
{
category: "Curries",
name: "Veg Makhani",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-veg-makhani.jpg",
alt: "Mixed vegetable makhani in a rich buttery tomato gravy"
},
{
category: "Curries",
name: "Veg Saag",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild",
image: "/images/dish-veg-saag.jpg",
alt: "Mixed vegetables cooked in a spiced spinach gravy"
},
{
category: "Curries",
name: "Butter Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-butter-chicken.jpg",
alt: "Creamy butter chicken curry garnished with mint"
},
{
category: "Curries",
name: "Punjabi Butter Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-punjabi-butter-chicken.jpg",
alt: "Punjabi butter chicken in a rich buttery tomato gravy"
},
{
category: "Curries",
name: "Delhi Mughlai Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-delhi-mughlai-chicken.jpg",
alt: "Delhi Mughlai chicken in a rich, aromatic gravy"
},
{
category: "Curries",
name: "Murgh Pudina Kali Mirch",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Spicy",
image: "/images/dish-murgh-pudina-kali-mirch.jpg",
alt: "Murgh pudina kali mirch chicken in a mint and black pepper gravy"
},
{
category: "Curries",
name: "Chicken Kolhapuri",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-chicken-kolhapuri.jpg",
alt: "Chicken Kolhapuri in a spicy, dark Kolhapuri-style gravy"
},
{
category: "Curries",
name: "Chicken Madras",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-chicken-madras.jpg",
alt: "Dark, richly spiced Chicken Madras curry garnished with onion and lemon"
},
{
category: "Curries",
name: "Chicken Tikka Masala",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-chicken-tikka-masala.jpg",
alt: "Chicken tikka masala in a creamy tomato gravy"
},
{
category: "Curries",
name: "Kadai Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-kadai-chicken.jpg",
alt: "Kadai chicken cooked with peppers and onions in a kadai-style gravy"
},
{
category: "Curries",
name: "Adarki Rara Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Spicy",
image: "/images/dish-adarki-rara-chicken.jpg",
alt: "Adarki rara chicken in a ginger-spiced minced gravy"
},
{
category: "Curries",
name: "Chicken Korma",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-chicken-korma.jpg",
alt: "Chicken korma in a mild, creamy gravy"
},
{
category: "Curries",
name: "Chicken Makhani",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-chicken-makhani.jpg",
alt: "Chicken makhani in a rich buttery tomato gravy"
},
{
category: "Curries",
name: "Chicken Saag",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-chicken-saag.jpg",
alt: "Chicken saag cooked in a spiced spinach gravy"
},
{
category: "Curries",
name: "Mango Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-mango-chicken.jpg",
alt: "Mango chicken in a sweet and tangy mango-spiced gravy"
},
{
category: "Curries",
name: "Lamb Roganjosh",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-lamb-rogan-josh.jpg",
alt: "Lamb rogan josh in a rich Kashmiri-style spiced gravy"
},
{
category: "Curries",
name: "Pepper Lamb Masala",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Spicy",
image: "/images/dish-pepper-lamb-masala.jpg",
alt: "Pepper lamb masala in a coarsely ground black pepper gravy"
},
{
category: "Curries",
name: "Lamb Korma",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-lamb-korma.jpg",
alt: "Lamb korma in a mild, creamy gravy"
},
{
category: "Curries",
name: "Lamb Makhani",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-lamb-makhani.jpg",
alt: "Lamb makhani in a rich buttery tomato gravy"
},
{
category: "Curries",
name: "Lamb Saag",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-lamb-saag.jpg",
alt: "Lamb saag cooked in a spiced spinach gravy"
},
{
category: "Curries",
name: "Goat Curry",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-goat-curry.jpg",
alt: "Thick, dark, richly spiced goat curry"
},
{
category: "Curries",
name: "Bhuna Goat",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-bhuna-goat.jpg",
alt: "Bhuna goat cooked down in a thick, dry-roasted masala"
},
{
category: "Curries",
name: "Delhi Mughlai Goat Curry",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-delhi-mughlai-goat-curry.jpg",
alt: "Delhi Mughlai goat curry in a rich, aromatic gravy"
},
{
category: "Curries",
name: "Goat Karahi",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-goat-karahi-curry.jpg",
alt: "Goat karahi cooked with tomatoes and green chillies"
},
{
category: "Curries",
name: "Goat Korma",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-goat-korma.jpg",
alt: "Goat korma in a mild, creamy gravy"
},
{
category: "Curries",
name: "Goat Makhani",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-goat-makhani.jpg",
alt: "Goat makhani in a rich buttery tomato gravy"
},
{
category: "Curries",
name: "Goat Saag",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild",
image: "/images/dish-goat-saag.jpg",
alt: "Goat saag cooked in a spiced spinach gravy"
},
{
category: "Curries",
name: "Prawn Masala",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium",
image: "/images/dish-prawn-masala.jpg",
alt: "Prawn masala in a spiced tomato and onion gravy"
}
];

// Everything the Craving Finder is allowed to return. DISHES is deliberately
// not included: it is the curated, photographed showcase and repeats dishes
// that these full menus already state authoritative diet, spice and prices
// for, so spreading it in would double up rows.
export const CRAVING_MENU: Dish[] = [...DOSA_MENU, ...BIRYANI_MENU, ...CURRY_MENU];

export type Stat = {
  value: string;
  label: string;
};

export const STORY_STATS: Stat[] = [
  { value: "25+", label: "Branches Across Australia" },
  { value: "7M+", label: "Customers Served Yearly" },
  { value: "2025", label: "Culinary & Hospitality Award" },
];

export type Feature = {
  title: string;
  description: string;
};

export const FEATURES: Feature[] = [
  {
    title: "Authentic Spices",
    description: "Imported traditional Indian spices ground fresh daily.",
  },
  {
    title: "90+ Dosa Varieties",
    description: "Queensland's largest live dosa menu served fresh and hot.",
  },
  {
    title: "100% Halal & Pure Veg",
    description: "Dedicated preparation spaces respecting all dietary choices.",
  },
  {
    title: "Fast Local Delivery",
    description: "Hot & fresh via UberEats, DoorDash, or direct takeaway.",
  },
];

// Scratchy Tuesday: dine-in and spend $40+ on a Tuesday, staff hand out the
// QR code, scan it to get a scratch card. Odds are weighted, not a plain
// random pick off the list: each entry's `weight` is its share out of 100
// scratches, and the weights below intentionally sum to 70 — the remaining
// 30 out of 100 land on SCRATCHY_TUESDAY_LOSE_WEIGHT, a non-winning
// "Better luck next time" outcome (see SCRATCHY_TUESDAY_LOSE_MESSAGE).
export type ScratchReward = {
  name: string;
  weight: number;
};

export const SCRATCHY_TUESDAY_REWARDS: ScratchReward[] = [
  { name: "Masala Dosa", weight: 2 },
  { name: "Mango Lassi", weight: 14 },
  { name: "Chai", weight: 14 },
  { name: "Soft Drink", weight: 16 },
  { name: "Samosa", weight: 14 },
  { name: "Gulab Jamun", weight: 8 },
  { name: "Idly", weight: 2 },
];

// Out of every 100 scratches, this many (30) reveal no prize at all.
export const SCRATCHY_TUESDAY_LOSE_WEIGHT = 30;
export const SCRATCHY_TUESDAY_LOSE_MESSAGE = "Better Luck Next Time";
