// Server-only module — uses Node.js fs/path. Never import this in Client Components.
// Use lib/blog-types.ts for types/constants in client code.
import fs from "fs"
import path from "path"
import type { BlogPost, BlogStatus } from "./blog-types"

export type { BlogPost, BlogStatus }
export { BLOG_CATEGORIES } from "./blog-types"

const DATA_FILE = path.join(process.cwd(), "data", "blog-posts.json")

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_POSTS, null, 2))
  }
}

export function getAllPosts(): BlogPost[] {
  ensureDataFile()
  const raw = fs.readFileSync(DATA_FILE, "utf-8")
  return JSON.parse(raw) as BlogPost[]
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.status === "published")
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getPostById(id: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.id === id)
}

export function createPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost {
  const posts = getAllPosts()
  const post: BlogPost = {
    ...data,
    id: `post_${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: data.status === "published" ? new Date().toISOString() : undefined,
  }
  posts.unshift(post)
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2))
  return post
}

export function updatePost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return null
  const existing = posts[idx]
  const updated: BlogPost = {
    ...existing,
    ...data,
    id: existing.id,
    updatedAt: new Date().toISOString(),
    publishedAt:
      data.status === "published" && !existing.publishedAt
        ? new Date().toISOString()
        : existing.publishedAt,
  }
  posts[idx] = updated
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2))
  return updated
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts()
  const filtered = posts.filter((p) => p.id !== id)
  if (filtered.length === posts.length) return false
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2))
  return true
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function calculateReadTime(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

const SEED_POSTS: BlogPost[] = [
  {
    id: "post_1",
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    slug: "10-hidden-gems-southeast-asia",
    excerpt:
      "Beyond the tourist trails lie breathtaking places most travelers never discover. From Vietnam's misty highlands to Bali's secret temples, here are 10 places that will steal your heart.",
    content: `## Discover the Unexplored

Southeast Asia is more than just Angkor Wat and Bali beaches. Venture beyond the well-trodden path and you'll find a world of wonder that most tourists never get to experience.

## 1. Phong Nha, Vietnam

Nestled in central Vietnam, Phong Nha is home to some of the world's largest and most spectacular cave systems. The Son Doong Cave here is so large it has its own weather system and jungle inside.

**What to do:**
- Cave trekking with expert guides
- Kayaking on the Son River
- Cycling through emerald rice paddies

## 2. Koh Rong Sanloem, Cambodia

While everyone flocks to Sihanoukville, this pristine island remains blissfully uncrowded. Bioluminescent plankton lights up the waters at night, creating a magical glow.

## 3. Hsipaw, Myanmar

This small town in northern Myanmar is a trekker's paradise. Multi-day treks through Shan State villages reward you with authentic cultural experiences that money can't buy.

## 4. Mulu National Park, Borneo

Home to Sarawak Chamber — the world's largest cave chamber — Mulu's karst formations and wildlife are simply extraordinary.

## 5. El Nido's Secret Beaches, Philippines

Beyond the famous lagoons, El Nido hides secret beaches accessible only by kayak, where you'll often have paradise entirely to yourself.

## 6. Pai, Thailand

This tiny mountain town near Chiang Mai has a bohemian soul, stunning waterfall hikes, and a laid-back vibe that makes it nearly impossible to leave.

## 7. Flores, Indonesia

Often overlooked in favour of Lombok, Flores offers Komodo dragons, pink sand beaches, and the magical three-coloured crater lakes of Kelimutu.

## 8. Luang Namtha, Laos

Deep in northern Laos, this small town is the gateway to jungle trekking with ethnic minority communities who still live as they have for centuries.

## 9. Can Tho, Vietnam

Experience the legendary floating markets of the Mekong Delta at dawn, when vendors trade fruits and vegetables from colourful wooden boats.

## 10. Phu Quoc's North Coast, Vietnam

While the south is becoming developed, the northern coast of Phu Quoc still has deserted beaches, fishing villages, and pure serenity.

---

*Planning your Southeast Asia adventure? Contact EasYourTour for customised itineraries to these hidden gems.*`,
    author: "Mustafa Dhariwala",
    category: "Destinations",
    tags: ["Southeast Asia", "Hidden Gems", "Vietnam", "Bali", "Adventure"],
    coverImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    status: "published",
    createdAt: "2026-07-01T08:00:00.000Z",
    updatedAt: "2026-07-01T08:00:00.000Z",
    publishedAt: "2026-07-01T08:00:00.000Z",
    readTime: 5,
  },
  {
    id: "post_2",
    title: "The Ultimate Meghalaya Travel Guide: Waterfalls, Caves & More",
    slug: "ultimate-meghalaya-travel-guide",
    excerpt:
      "Meghalaya — the 'Abode of Clouds' — is one of India's most spectacular yet undervisited states. Here's everything you need to know before your trip.",
    content: `## Why Meghalaya Should Be Your Next Indian Adventure

Tucked in India's Northeast, Meghalaya is a land of living root bridges, thundering waterfalls, and Asia's cleanest village. Yet relatively few travellers make the trip. That's your advantage.

## Best Time to Visit

**October to April** is ideal. The monsoon (June–September) brings rain but also transforms the landscape into an electric green, though travel can be tricky.

## Getting There

Fly into Guwahati (the nearest major airport) and then drive to Shillong — a scenic 2-hour journey through misty hills.

## Top Experiences

### Living Root Bridges
The double-decker living root bridge in Nongriat village is Meghalaya's most iconic sight. These bridges are woven from rubber tree roots over decades — some are over 500 years old. The trek is challenging (3,500+ steps) but absolutely worth it.

### Dawki & Umngot River
The crystal-clear Umngot River at Dawki is so transparent that boats appear to float in air. Visit early morning for the most surreal experience.

### Nohkalikai Falls
At 340 metres, these are India's tallest plunge waterfalls. The view from the top, especially during monsoon, is breathtaking.

### Mawsmai Caves
Located near Cherrapunjee, these limestone caves are easily accessible and stunningly lit with colourful formations.

### Mawlynnong — Asia's Cleanest Village
This immaculate village near the Bangladesh border is spotlessly clean and warmly welcoming. Climb the bamboo sky walk for views into Bangladesh.

## Where to Stay

- **Shillong**: Hotel Polo Towers, Cafe Shillong Heritage
- **Cherrapunjee**: Cherrapunjee Holiday Resort, Polo Orchid Resort
- **Nongriat**: Homestays at the base of the root bridge trek

## Food to Try

- Jadoh (rice cooked with pork)
- Dohkhlieh (pork salad)
- Tungrymbai (fermented soybean chutney)
- Kwai (betel nut — a local tradition)

## Travel Tips

1. Hire a local guide for trekking — they know the terrain and can share stories
2. Carry cash; ATMs can be unreliable in remote areas
3. Respect local customs — many villages have rules about photography
4. Book accommodation in advance for peak season (October–November)

---

*Ready for your Meghalaya adventure? EasYourTour offers curated 5N/6D Meghalaya packages including all transfers, accommodation, and sightseeing.*`,
    author: "Mustafa Dhariwala",
    category: "Destinations",
    tags: ["Meghalaya", "India", "Waterfalls", "Northeast India", "Travel Guide"],
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    status: "published",
    createdAt: "2026-07-10T08:00:00.000Z",
    updatedAt: "2026-07-10T08:00:00.000Z",
    publishedAt: "2026-07-10T08:00:00.000Z",
    readTime: 7,
  },
  {
    id: "post_3",
    title: "Bali on a Budget: How to Experience Paradise Without Breaking the Bank",
    slug: "bali-on-a-budget-guide",
    excerpt:
      "Bali's reputation as a luxury destination needn't stop you from visiting. With the right planning, you can experience the magic of the Island of Gods for far less than you'd expect.",
    content: `## Bali for Every Budget

Yes, Bali has world-class luxury resorts. But it also has incredible guesthouses, cheap local food, and free temple experiences that money can't improve. Here's how to do it right.

## Accommodation

**Budget (under Rs 2,000/night)**: Guesthouses in Canggu, Ubud, or Seminyak's side streets.

**Mid-range (Rs 2,000-8,000)**: Boutique hotels with pool access and daily breakfast.

**Splurge (Rs 8,000+)**: Private pool villas in Ubud's rice terraces.

## Getting Around

- **Scooter rental**: Rs 300-500/day. The best way to explore.
- **Gojek/Grab**: Cheap ride-sharing apps, perfect for short trips.
- **Day driver**: Hire a local driver for Rs 1,500-2,000/day to cover multiple sights.

## Food on the Cheap

Bali's warungs (local eateries) serve delicious, authentic food for Rs 100-300 per meal:
- Nasi goreng (fried rice): Rs 50-100
- Mie goreng (fried noodles): Rs 50-100
- Fresh coconuts: Rs 50-80

## Free & Low-Cost Activities

- Sunrise at Mount Batur
- Tanah Lot temple at sunset (Rs 50 entrance)
- Tegalalang Rice Terraces
- Watching the Kecak fire dance at Uluwatu (Rs 150-200)

## Budget Breakdown (Per Day)

| Category | Budget | Mid-range |
|----------|--------|-----------|
| Accommodation | Rs 1,500 | Rs 4,000 |
| Food | Rs 600 | Rs 1,500 |
| Transport | Rs 500 | Rs 1,500 |
| Activities | Rs 500 | Rs 2,000 |
| **Total** | **Rs 3,100** | **Rs 9,000** |

---

*Looking for a Bali package? EasYourTour's Bali packages include beachfront accommodation, island tours, and private transfers at competitive prices.*`,
    author: "Mustafa Dhariwala",
    category: "Budget Travel",
    tags: ["Bali", "Budget Travel", "Indonesia", "Travel Tips", "Southeast Asia"],
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    status: "published",
    createdAt: "2026-07-15T08:00:00.000Z",
    updatedAt: "2026-07-15T08:00:00.000Z",
    publishedAt: "2026-07-15T08:00:00.000Z",
    readTime: 6,
  },
]
