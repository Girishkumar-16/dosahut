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
    price: "$16.95",
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
    price: "$11.95",
    image: "/images/dish-onion-dosa.jpg",
    alt: "Crisp onion dosa topped with onions",
  },

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
    name: "Cheese & Chilli Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-cheese-chilli-dosa.jpg",
    alt: "Cheese and chilli dosa with a melted cheese and green chilli filling",
  },
  {
    category: "Dosa",
    name: "Veg Dosa Chef Special",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-vegetable-dosa.jpg",
    alt: "Dosa filled with a spiced mixed-vegetable masala",
  },
  {
    category: "Dosa",
    name: "Lamb Dosa",
    price: "$16.95",
    diet: "Non-Veg",
    spiceLevel: "Medium",
    image: "/images/dish-lamb-dosa.jpg",
    alt: "Dosa filled with spiced minced lamb",
  },
  {
    category: "Dosa",
    name: "Rava Onion Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-onion-dosa.jpg",
    alt: "Lacy rava onion dosa scattered with onion and coriander",
  },
  {
    category: "Dosa",
    name: "Rava Masala Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-masala-dosa.jpg",
    alt: "Crisp rava masala dosa folded over a potato masala filling",
  },
  {
    category: "Dosa",
    name: "Rava Lamb Dosa",
    price: "$18.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
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
  { category: "Dosa", name: "Onion Dosa", price: "$10.95", diet: "Veg", spiceLevel: "Mild" },
  { category: "Dosa", name: "Masala Dosa", price: "$15.95", diet: "Veg", spiceLevel: "Mild" },
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
  { category: "Dosa", name: "Ghee Podi Dosa", price: "$9.95", diet: "Veg", spiceLevel: "Medium" },
  { category: "Dosa", name: "Paneer Dosa", price: "$16.95", diet: "Veg", spiceLevel: "Mild" },
  { category: "Dosa", name: "Mysore Masala Dosa", price: "$15.95", diet: "Veg", spiceLevel: "Medium" },
  {
    category: "Dosa",
    name: "Cheese & Chilli Dosa",
    price: "$15.95",
    diet: "Veg",
    spiceLevel: "Spicy",
    image: "/images/dish-cheese-chilli-dosa.jpg",
    alt: "Cheese and chilli dosa with a melted cheese and green chilli filling",
  },
  { category: "Dosa", name: "Chicken Dosa", price: "$16.95", diet: "Non-Veg", spiceLevel: "Mild" },
  { category: "Dosa", name: "Chicken 65 Dosa", price: "$16.95", diet: "Non-Veg", spiceLevel: "Spicy" },
  {
    category: "Dosa",
    name: "Lamb Dosa",
    price: "$16.95",
    diet: "Non-Veg",
    spiceLevel: "Medium",
    image: "/images/dish-lamb-dosa.jpg",
    alt: "Dosa filled with spiced minced lamb",
  },
  {
    category: "Dosa",
    name: "Veg Dosa Chef Special",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Medium",
    image: "/images/dish-vegetable-dosa.jpg",
    alt: "Dosa filled with a spiced mixed-vegetable masala",
  },
  { category: "Dosa", name: "Non-Veg Dosa Chef Special", price: "$17.95", diet: "Non-Veg", spiceLevel: "Medium" },
  { category: "Rava Dosa", name: "Rava Plain Dosa", price: "$15.95", diet: "Veg", spiceLevel: "Mild" },
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
  { category: "Rava Dosa", name: "Rava Paneer Dosa", price: "$17.95", diet: "Veg", spiceLevel: "Mild" },
  { category: "Rava Dosa", name: "Rava Chicken Dosa", price: "$18.95", diet: "Non-Veg", spiceLevel: "Mild" },
  {
    category: "Rava Dosa",
    name: "Rava Lamb Dosa",
    price: "$18.95",
    diet: "Non-Veg",
    spiceLevel: "Mild",
    image: "/images/dish-rava-lamb-dosa.jpg",
    alt: "Rava dosa filled with spiced lamb",
  },
  { category: "Uttapam", name: "Onion Uttapam", price: "$16.95", diet: "Veg", spiceLevel: "Mild" },
  { category: "Uttapam", name: "Onion & Chilli Uttapam", price: "$16.95", diet: "Veg", spiceLevel: "Spicy" },

  {
    category: "Dosa",
    name: "Onion Dosa",
    price: "$11.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-onion-dosa.jpg",
    alt: "Crisp onion dosa topped with onions",
  },
  { category: "Dosa", name: "Ghee Podi Dosa", price: "$11.95", diet: "Veg", spiceLevel: "Mild" },
  {
    category: "Dosa",
    name: "Masala Dosa",
    price: "$16.95",
    diet: "Veg",
    spiceLevel: "Mild",
    image: "/images/dish-masala-dosa.jpg",
    alt: "Crisp masala dosa served with a plate of accompaniments",
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
    spiceLevel: "Spicy"
  },
  {
    category: "Biryani & More",
    name: "Soya Chaap Tikka Biryani",
    price: "$17.95",
    diet: "Veg",
    spiceLevel: "Medium"
  },
  {
    category: "Biryani & More",
    name: "Paneer 65 Biryani",
    price: "$19.95",
    diet: "Veg",
    spiceLevel: "Spicy"
  },
  {
    category: "Biryani & More",
    name: "Paneer Tikka Biryani",
    price: "$19.95",
    diet: "Veg",
    spiceLevel: "Medium"
  },

  // EGG BIRYANIS
  {
    category: "Biryani & More",
    name: "Egg Biryani",
    price: "$18.95",
    diet: "Egg",
    spiceLevel: "Medium"
  },
  {
    category: "Biryani & More",
    name: "Egg 65 Biryani",
    price: "$18.95",
    diet: "Egg",
    spiceLevel: "Spicy"
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
    spiceLevel: "Medium"
  },
  {
    category: "Biryani & More",
    name: "Chicken Tikka Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Medium"
  },
  {
    category: "Biryani & More",
    name: "Chicken Fry Piece Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy"
  },
  {
    category: "Biryani & More",
    name: "Pacchi Mirchi Chicken Biryani",
    price: "$19.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy"
  },
  {
    category: "Biryani & More",
    name: "Prawn Roast Biryani",
    price: "$21.95",
    diet: "Non-Veg",
    spiceLevel: "Spicy"
  },
  {
    category: "Biryani & More",
    name: "Special Keema Pulao",
    price: "$21.95",
    diet: "Non-Veg",
    spiceLevel: "Medium"
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
spiceLevel: "Mild"
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
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Paneer Tikka Masala",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild"
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
spiceLevel: "Spicy"
},
{
category: "Curries",
name: "Kadai Paneer",
price: "$19.95",
diet: "Veg",
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Veg Kolhapuri",
price: "$19.95",
diet: "Veg",
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Paneer Dhaniya Hara Pyaaz",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Veg Korma",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Veg Makhani",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Veg Saag",
price: "$19.95",
diet: "Veg",
spiceLevel: "Mild"
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
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Delhi Mughlai Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Murgh Pudina Kali Mirch",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Spicy"
},
{
category: "Curries",
name: "Chicken Kolhapuri",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Medium"
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
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Adarki Rara Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Spicy"
},
{
category: "Curries",
name: "Chicken Korma",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Chicken Makhani",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Chicken Saag",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Mango Chicken",
price: "$21.95",
diet: "Non-Veg",
spiceLevel: "Mild"
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
spiceLevel: "Spicy"
},
{
category: "Curries",
name: "Lamb Korma",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Lamb Makhani",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Lamb Saag",
price: "$22.95",
diet: "Non-Veg",
spiceLevel: "Mild"
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
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Delhi Mughlai Goat Curry",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Goat Karahi",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium"
},
{
category: "Curries",
name: "Goat Korma",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Goat Makhani",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Goat Saag",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Mild"
},
{
category: "Curries",
name: "Prawn Masala",
price: "$23.95",
diet: "Non-Veg",
spiceLevel: "Medium"
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
