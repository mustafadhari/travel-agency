// Blog Post Templates for EasyOurTour
// Standardized structures for different content types

export const BLOG_TEMPLATES = {
  'pillar-page': {
    name: 'Pillar Page Template',
    description: 'Comprehensive guide covering a broad topic with multiple sections',
    structure: [
      'Hero section with compelling hook',
      'Table of contents',
      'Introduction (300-500 words)',
      'Main sections (4-6 sections, 500-800 words each)',
      'Data table or comparison chart',
      'Expert tips section',
      'FAQ section (5-7 questions)',
      'Conclusion with CTA',
      'Related resources'
    ],
    wordCount: '3,000-4,000 words',
    sections: {
      introduction: {
        title: 'Introduction',
        description: 'Set the context, explain why this topic matters, and preview what readers will learn',
        wordCount: '300-500 words'
      },
      mainContent: {
        title: 'Main Content Sections',
        description: '4-6 detailed sections covering different aspects of the topic',
        wordCount: '500-800 words each',
        include: ['Subheadings', 'Images', 'Data visualizations', 'Expert quotes']
      },
      dataVisualization: {
        title: 'Data Visualization',
        description: 'Include at least one data table, comparison chart, or infographic',
        types: ['Comparison tables', 'Seasonal charts', 'Budget breakdowns', 'Maps']
      },
      expertTips: {
        title: 'Expert Tips',
        description: 'Practical advice from EasyOurTour specialists',
        format: 'Bullet points or numbered list with 5-10 actionable tips'
      },
      faq: {
        title: 'Frequently Asked Questions',
        description: 'Address common reader questions with concise answers',
        questions: 5-7,
        wordCount: '50-150 words per answer'
      },
      conclusion: {
        title: 'Conclusion',
        description: 'Summarize key takeaways and include strong call-to-action',
        wordCount: '200-300 words',
        cta: 'Encourage readers to contact EasyOurTour or explore related content'
      }
    },
    seo: {
      metaTitle: 'Include primary keyword + brand name',
      metaDescription: '150-160 characters with primary keyword and compelling reason to click',
      urlStructure: '/blog/topic-keyword-year',
      internalLinks: '5-8 links to related content',
      externalLinks: '3-5 authoritative sources'
    },
    visuals: {
      featuredImage: '1200x630px with title overlay',
      sectionImages: '3-5 relevant images (800x600px)',
      infographic: '1 custom infographic summarizing key data',
      video: 'Optional: 2-3 minute overview video'
    }
  },

  'how-to-guide': {
    name: 'How-To Guide Template',
    description: 'Step-by-step instructions for completing a specific travel-related task',
    structure: [
      'Engaging introduction explaining the benefit',
      'Prerequisites/what you need',
      'Step-by-step instructions (5-10 steps)',
      'Common mistakes to avoid',
      'Pro tips from experts',
      'Alternative approaches',
      'Conclusion with success tips'
    ],
    wordCount: '1,500-2,500 words',
    sections: {
      introduction: {
        title: 'Introduction',
        description: 'Explain what readers will accomplish and why it matters',
        wordCount: '200-300 words',
        include: ['Problem statement', 'Solution preview', 'Benefits']
      },
      prerequisites: {
        title: 'What You Need',
        description: 'List all requirements before starting',
        format: 'Bullet list with links to recommended products/services'
      },
      steps: {
        title: 'Step-by-Step Instructions',
        description: 'Clear, numbered steps with visuals',
        steps: 5-10,
        format: 'H3 subheadings with detailed explanations and images'
      },
      mistakes: {
        title: 'Common Mistakes to Avoid',
        description: 'Help readers avoid pitfalls',
        items: 3-5,
        format: 'Warning boxes with solutions'
      },
      proTips: {
        title: 'Pro Tips',
        description: 'Expert advice to enhance results',
        items: 3-5,
        format: 'Highlighted boxes with actionable tips'
      }
    },
    seo: {
      metaTitle: 'How to [accomplish task] in [year] | EasyOurTour',
      metaDescription: 'Step-by-step guide to [task] with expert tips. Learn how to [benefit] with EasyOurTour.',
      urlStructure: '/blog/how-to-task-keyword',
      internalLinks: '3-5 related guides',
      externalLinks: '2-3 authoritative sources'
    },
    visuals: {
      featuredImage: '1200x630px showing the end result',
      stepImages: '1 image per major step (600x400px)',
      processDiagram: 'Optional flowchart of the process'
    }
  },

  'listicle': {
    name: 'Listicle Template',
    description: 'Curated list of items with brief descriptions and rankings',
    structure: [
      'Engaging introduction',
      'Selection criteria/methodology',
      'The list (7-15 items)',
      'Comparison table (if applicable)',
      'Honorable mentions',
      'How to choose what's best for you',
      'Conclusion'
    ],
    wordCount: '1,500-2,500 words',
    sections: {
      introduction: {
        title: 'Introduction',
        description: 'Explain the list topic and its importance',
        wordCount: '200-300 words',
        include: ['Hook', 'Problem it solves', 'Preview of list']
      },
      criteria: {
        title: 'How We Selected',
        description: 'Transparency about selection process',
        format: 'Bullet list of criteria with brief explanations'
      },
      listItems: {
        title: 'The List',
        description: 'Detailed entries with pros/cons',
        items: 7-15,
        format: 'H2 title, image, 150-200 word description, pros/cons, rating'
      },
      comparison: {
        title: 'Comparison Table',
        description: 'Quick reference for key attributes',
        format: 'Table with 3-5 comparison criteria'
      },
      choosingGuide: {
        title: 'How to Choose',
        description: 'Help readers select the best option',
        format: 'Decision tree or questionnaire style'
      }
    },
    seo: {
      metaTitle: '[Number] Best [topic] in [year] | Expert Picks | EasyOurTour',
      metaDescription: 'Discover the [number] best [topic] for [year]. Expert picks and comparisons to help you choose.',
      urlStructure: '/blog/best-topic-year',
      internalLinks: '3-5 related lists or guides',
      externalLinks: '2-3 authoritative sources'
    },
    visuals: {
      featuredImage: '1200x630px with "Top [number]" overlay',
      itemImages: '1 image per list item (400x300px)',
      comparisonTable: 'Visual table with icons/ratings'
    }
  },

  'comparison': {
    name: 'Comparison Guide Template',
    description: 'Detailed comparison of 2-4 options to help readers decide',
    structure: [
      'Introduction explaining the decision',
      'Overview of each option',
      'Detailed comparison (5-7 criteria)',
      'Pros and cons of each',
      'Best for different traveler types',
      'Final recommendation',
      'Alternative options'
    ],
    wordCount: '1,800-2,500 words',
    sections: {
      introduction: {
        title: 'Introduction',
        description: 'Explain the comparison topic and why it matters',
        wordCount: '200-300 words',
        include: ['Decision context', 'Importance', 'Preview of options']
      },
      overviews: {
        title: 'Option Overviews',
        description: 'Brief introduction to each option',
        options: 2-4,
        wordCount: '100-150 words per option'
      },
      comparison: {
        title: 'Detailed Comparison',
        description: 'Side-by-side analysis of key factors',
        criteria: 5-7,
        format: 'Table with ratings/scores for each criterion'
      },
      prosCons: {
        title: 'Pros and Cons',
        description: 'Balanced analysis of each option',
        format: 'Two-column layout (pros vs cons) for each option'
      },
      recommendations: {
        title: 'Recommendations',
        description: 'Tailored suggestions for different needs',
        travelerTypes: ['Budget travelers', 'Families', 'Luxury seekers', 'Solo travelers'],
        format: 'Clear winner for each category with reasoning'
      }
    },
    seo: {
      metaTitle: '[Option A] vs [Option B]: Which is Better in [year]? | EasyOurTour',
      metaDescription: 'Detailed comparison of [options]. Find out which is best for your [travel need] in our expert guide.',
      urlStructure: '/blog/option-a-vs-option-b',
      internalLinks: '3-5 related comparison guides',
      externalLinks: '2-3 authoritative sources'
    },
    visuals: {
      featuredImage: '1200x630px showing both options',
      optionImages: '1 image per option (600x400px)',
      comparisonChart: 'Visual comparison with icons/ratings',
      decisionFlowchart: 'Optional: "Which should you choose?" flowchart'
    }
  }
}

export function getTemplateByType(type: keyof typeof BLOG_TEMPLATES) {
  return BLOG_TEMPLATES[type]
}

export function getAllTemplateTypes() {
  return Object.keys(BLOG_TEMPLATES) as Array<keyof typeof BLOG_TEMPLATES>
}