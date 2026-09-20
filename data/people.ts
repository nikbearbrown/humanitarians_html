export type LeadershipMember = {
  name: string
  role: string
  bio: string
  imageUrl?: string
  linkedinUrl?: string
}

export const leadership: LeadershipMember[] = [
  {
    name: "Nik Bear Brown",
    role: "Founder / Chief Executive Officer",
    bio: "Nik Bear Brown is an Associate Teaching Professor at Northeastern University and the founder of Humanitarians AI. His work spans artificial intelligence, data science, computational biology, visualization, game development, music technology, and education, with a focus on building practical AI systems for learning and social impact.",
    imageUrl: "/people/nik-bear-brown.png",
    linkedinUrl: "https://www.linkedin.com/in/nikbearbrown/",
  },
  {
    name: "Nina Harris",
    role: "Founder / Chief Creative Officer",
    bio: "Nina Harris is a creative and brand director, educator, and member of the Humanitarians AI leadership team. Her work connects brand strategy, creative engineering, mentorship, and AI-assisted educational media, including projects that use music and visual storytelling to support early learning.",
    imageUrl: "/people/nina-harris.jpg",
    linkedinUrl: "https://www.linkedin.com/in/nina-harris-524ab7108/",
  },
  {
    name: "Shesh Narayan Gupta",
    role: "Member, Board of Directors",
    bio: "Shesh Narayan Gupta is a Senior Manager of Data Science at Capital One, a published researcher, and an author working at the intersection of data science, generative AI, and interactive storytelling. He wrote Generative AI for Game Development: Crafting Narrative Worlds with Machines and supports Humanitarians AI as a member of its Board of Directors.",
    imageUrl: "/people/shesh-narayan-gupta.jpg",
    linkedinUrl: "https://www.linkedin.com/in/shesh-narayan-gupta/",
  },
  {
    name: "Robert Cole Harris",
    role: "Chief People Officer",
    bio: "Robert Cole Harris serves as Chief People Officer for Humanitarians AI, supporting the people and community at the center of the organization. Additional professional background will be added when a public biography is available.",
    imageUrl: "/people/robert-cole-harris.jpg",
    linkedinUrl: "https://www.linkedin.com/in/robertcoleharris/",
  },
]
