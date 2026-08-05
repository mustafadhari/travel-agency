// Newsletter Management for EasyOurTour Blog
// Handles email subscriptions and newsletter content

import fs from 'fs'
import path from 'path'
import type { BlogPost } from './blog-types'

const NEWSLETTER_DIR = path.join(process.cwd(), 'data', 'newsletter')
const SUBSCRIBERS_FILE = path.join(NEWSLETTER_DIR, 'subscribers.json')
const TEMPLATES_FILE = path.join(NEWSLETTER_DIR, 'templates.json')

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  subscribedAt: string
  preferences?: {
    travelTypes?: string[]
    destinations?: string[]
    frequency?: 'weekly' | 'biweekly' | 'monthly'
  }
  status: 'active' | 'unsubscribed' | 'bounced'
}

export interface NewsletterTemplate {
  id: string
  name: string
  subject: string
  previewText: string
  content: string
  type: 'welcome' | 'weekly' | 'feature' | 'promotion'
}

export interface NewsletterIssue {
  id: string
  title: string
  subject: string
  previewText: string
  content: string
  featuredPosts: string[]
  sentAt?: string
  scheduledAt?: string
  status: 'draft' | 'scheduled' | 'sent' | 'cancelled'
  metrics?: {
    sent: number
    opened: number
    clicked: number
    bounced: number
    unsubscribed: number
  }
}

// Ensure newsletter directory exists
function ensureNewsletterDir() {
  if (!fs.existsSync(NEWSLETTER_DIR)) {
    fs.mkdirSync(NEWSLETTER_DIR, { recursive: true })
  }
}

// Initialize default data files
function initializeNewsletterData() {
  ensureNewsletterDir()

  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2))
  }

  if (!fs.existsSync(TEMPLATES_FILE)) {
    const defaultTemplates: NewsletterTemplate[] = [
      {
        id: 'welcome',
        name: 'Welcome Series',
        subject: 'Welcome to EasyOurTour! 🌍',
        previewText: 'Your journey to amazing travel experiences starts here',
        content: `# Welcome to EasyOurTour!

Thank you for subscribing to our newsletter! You're now part of our travel community and will receive:

✅ Exclusive travel tips and destination guides
✅ Special offers and early access to deals
✅ Insider knowledge from our travel experts
✅ Inspiration for your next adventure

**What would you like to see first?**

[Explore Our Blog](#) | [Browse Destinations](#) | [View Current Deals](#)

Stay tuned for our next issue!

The EasyOurTour Team`,
        type: 'welcome'
      },
      {
        id: 'weekly-roundup',
        name: 'Weekly Roundup',
        subject: 'This Week in Travel: {{date}}',
        previewText: 'New destinations, expert tips, and travel inspiration',
        content: `# This Week in Travel: {{date}}

Hi {{name}},

Here's what's new this week at EasyOurTour:

## 📖 Featured Article
**{{featured_title}}**
{{featured_excerpt}}
[Read More](#)

## 🌍 Destination Spotlight
{{destination_name}}
{{destination_description}}
[Explore Now](#)

## 💡 Travel Tip of the Week
{{travel_tip}}

## 🎁 Exclusive Offer
{{offer_description}}
[Claim Your Deal](#)

**Follow us for daily inspiration:**
[Facebook](#) | [Instagram](#) | [Twitter](#)

See you next week!
The EasyOurTour Team`,
        type: 'weekly'
      }
    ]

    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(defaultTemplates, null, 2))
  }
}

// Subscriber management
export function getSubscribers(): NewsletterSubscriber[] {
  initializeNewsletterData()
  const raw = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8')
  return JSON.parse(raw) as NewsletterSubscriber[]
}

export function addSubscriber(email: string, name?: string, preferences?: any): NewsletterSubscriber {
  const subscribers = getSubscribers()

  // Check if already subscribed
  const existing = subscribers.find(s => s.email === email && s.status === 'active')
  if (existing) {
    return existing
  }

  const subscriber: NewsletterSubscriber = {
    id: `sub_${Date.now()}`,
    email,
    name,
    preferences: preferences || {},
    subscribedAt: new Date().toISOString(),
    status: 'active'
  }

  subscribers.push(subscriber)
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))

  return subscriber
}

export function unsubscribe(email: string): boolean {
  const subscribers = getSubscribers()
  const index = subscribers.findIndex(s => s.email === email && s.status === 'active')

  if (index !== -1) {
    subscribers[index].status = 'unsubscribed'
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
    return true
  }

  return false
}

// Template management
export function getTemplates(): NewsletterTemplate[] {
  initializeNewsletterData()
  const raw = fs.readFileSync(TEMPLATES_FILE, 'utf-8')
  return JSON.parse(raw) as NewsletterTemplate[]
}

export function getTemplateById(id: string): NewsletterTemplate | undefined {
  return getTemplates().find(t => t.id === id)
}

// Newsletter issue management
export function getNewsletterIssues(): NewsletterIssue[] {
  ensureNewsletterDir()
  const issuesFile = path.join(NEWSLETTER_DIR, 'issues.json')

  if (!fs.existsSync(issuesFile)) {
    fs.writeFileSync(issuesFile, JSON.stringify([], null, 2))
    return []
  }

  const raw = fs.readFileSync(issuesFile, 'utf-8')
  return JSON.parse(raw) as NewsletterIssue[]
}

export function createNewsletterIssue(data: Omit<NewsletterIssue, 'id' | 'status'>): NewsletterIssue {
  const issues = getNewsletterIssues()

  const issue: NewsletterIssue = {
    ...data,
    id: `issue_${Date.now()}`,
    status: data.scheduledAt ? 'scheduled' : 'draft',
    sentAt: undefined
  }

  issues.push(issue)
  fs.writeFileSync(path.join(NEWSLETTER_DIR, 'issues.json'), JSON.stringify(issues, null, 2))

  return issue
}

export function updateNewsletterIssue(id: string, data: Partial<NewsletterIssue>): NewsletterIssue | null {
  const issues = getNewsletterIssues()
  const index = issues.findIndex(i => i.id === id)

  if (index !== -1) {
    const updated = { ...issues[index], ...data }
    issues[index] = updated
    fs.writeFileSync(path.join(NEWSLETTER_DIR, 'issues.json'), JSON.stringify(issues, null, 2))
    return updated
  }

  return null
}

// Generate newsletter content from blog posts
export function generateNewsletterFromPosts(posts: BlogPost[], templateId: string = 'weekly-roundup'): NewsletterIssue {
  const template = getTemplateById(templateId)

  if (!template) {
    throw new Error(`Template ${templateId} not found`)
  }

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1, 4)

  // Replace template placeholders
  let content = template.content
    .replace(/{{date}}/g, new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }))
    .replace(/{{name}}/g, 'Traveler')
    .replace(/{{featured_title}}/g, featuredPost.title)
    .replace(/{{featured_excerpt}}/g, featuredPost.excerpt)

  // Add other posts
  let otherPostsContent = ''
  otherPosts.forEach(post => {
    otherPostsContent += `\n### [${post.title}](#)\n${post.excerpt}\n`
  })

  content = content.replace(/{{other_posts}}/g, otherPostsContent)

  return {
    id: `issue_${Date.now()}`,
    title: `Weekly Roundup: ${new Date().toLocaleDateString()}`,
    subject: template.subject.replace(/{{date}}/g, new Date().toLocaleDateString()),
    previewText: template.previewText,
    content,
    featuredPosts: posts.map(p => p.slug),
    status: 'draft'
  }
}

// Get active subscribers count
export function getActiveSubscriberCount(): number {
  return getSubscribers().filter(s => s.status === 'active').length
}

// Initialize newsletter system
initializeNewsletterData()