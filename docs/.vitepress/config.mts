import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TS-AI API',
  description: 'TS-AI Developer API Docs',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/authentication' },
      { text: 'API Reference', link: '/image-generation' }
    ],

    sidebar: [
      {
        text: 'Basics',
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Authentication', link: '/authentication' }
        ]
      },
      {
        text: 'API Endpoints',
        items: [
          { text: 'User Balance', link: '/user-balance' },
          { text: 'Image Generation', link: '/image-generation' },
          { text: 'Video Generation', link: '/video-generation' },
          { text: 'Image Editing', link: '/image-editing' },
          { text: 'Task Status', link: '/task-status' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Workflows', link: '/workflows' },
          { text: 'Error Codes', link: '/error-codes' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'cURL', link: '/examples-curl' },
          { text: 'Python', link: '/examples-python' },
          { text: 'JavaScript', link: '/examples-javascript' }
        ]
      },
      {
        text: 'Appendix',
        items: [
          { text: 'Pricing', link: '/pricing' },
          { text: 'Database', link: '/database' }
        ]
      }
    ],

    socialLinks: [],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 TS-AI'
    },

    search: {
      provider: 'local'
    }
  }
})