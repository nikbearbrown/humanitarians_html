export type LoonNetGame = {
  id: string
  title: string
  season: string
  description: string
  image: string
  imageWidth: number
  imageHeight: number
  accent: string
}

export const LOONNET_CREDIT =
  "Developed based on concepts and chapters from Generative AI for Game Development: Crafting Narrative Worlds with Machines by Shesh Narayan Gupta · DOI: 10.1007/979-8-8688-2439-5"

export const loonNetGames: LoonNetGame[] = [
  {
    id: "nest-site",
    title: "Nest Site",
    season: "Spring",
    description:
      "Choose a safe shoreline nesting site. Place it too high and a loon cannot reach it; place it too low and boat wake can swamp it. Discover how artificial nesting platforms can help.",
    image: "/loonnet/screenshots/nest-site.png",
    imageWidth: 1891,
    imageHeight: 1177,
    accent: "#3E8B5F",
  },
  {
    id: "deep-dive",
    title: "Deep Dive",
    season: "Summer",
    description:
      "Dive to feed loon chicks through a season of changing water clarity. Learn why clear water matters to sight-hunting loons and why lead tackle is such a serious hazard.",
    image: "/loonnet/screenshots/deep-dive.png",
    imageWidth: 1906,
    imageHeight: 1186,
    accent: "#2F6F63",
  },
  {
    id: "runway",
    title: "Runway",
    season: "Fall",
    description:
      "Help a loon build enough speed across open water to become airborne. Learn why loons need a long aquatic runway and how birds can become stranded on wet pavement.",
    image: "/loonnet/screenshots/runway.png",
    imageWidth: 1900,
    imageHeight: 1177,
    accent: "#A96A16",
  },
  {
    id: "chick-taxi",
    title: "Chick Taxi",
    season: "Standalone",
    description:
      "Balance and collect while young chicks ride safely on a parent’s back in a simple browser game designed for the youngest visitors.",
    image: "/loonnet/screenshots/chick-taxi.png",
    imageWidth: 1897,
    imageHeight: 1183,
    accent: "#5E6C6F",
  },
]
