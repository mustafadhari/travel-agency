import type { BlogPost } from './blog-types'

export function generateBlogPostSchema(post: BlogPost): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio
    },
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt,
    "publisher": {
      "@type": "Organization",
      "name": "EasyOurTour",
      "logo": {
        "@type": "ImageObject",
        "url": "https://easyourtour.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://easyourtour.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`
  }

  return JSON.stringify(schema, null, 2)
}

export function generateBreadcrumbSchema(slug: string, title: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://easyourtour.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://easyourtour.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://easyourtour.com/blog/${slug}`
      }
    ]
  }

  return JSON.stringify(schema, null, 2)
}

export function generateFAQSchema(questions: { question: string; answer: string }[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((qa, index) => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  }

  return JSON.stringify(schema, null, 2)
}