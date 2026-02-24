import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "TS-AI API",
    description: "TS-AI 寮€鍙戣€?API 鏂囨。",
    lang: 'zh-CN',

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '棣栭〉', link: '/' },
            { text: '寮€濮嬩娇鐢?, link: '/authentication' },
            { text: 'API 鍙傝€?, link: '/image-generation' }
        ],

        sidebar: [
            {
                text: '鍏ラ棬',
                items: [
                    { text: '姒傝堪', link: '/overview' },
                    { text: '璁よ瘉鏂瑰紡', link: '/authentication' }
                ]
            },
            {
                text: 'API 绔偣',
                items: [
                    { text: '鏌ヨ浣欓', link: '/user-balance' },
                    { text: '鍥惧儚鐢熸垚', link: '/image-generation' },
                    { text: '瑙嗛鐢熸垚', link: '/video-generation' },
                    { text: '鍥剧墖缂栬緫', link: '/image-editing' },
                    { text: '浠诲姟鐘舵€佹煡璇?, link: '/task-status' }
                ]
            },
            {
                text: '杩涢樁',
                items: [
                    { text: '宸ヤ綔娴佽瑙?, link: '/workflows' },
                    { text: '閿欒鐮佸弬鑰?, link: '/error-codes' }
                ]
            },
            {
                text: '绀轰緥浠ｇ爜',
                items: [
                    { text: 'cURL', link: '/examples-curl' },
                    { text: 'Python', link: '/examples-python' },
                    { text: 'JavaScript', link: '/examples-javascript' }
                ]
            },
            {
                text: '闄勫綍',
                items: [
                    { text: '璐圭敤璇存槑', link: '/pricing' },
                    { text: '鏁版嵁搴撶粨鏋?, link: '/database' }
                ]
            }
        ],

        socialLinks: [],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright 漏 2026 TS-AI'
        },

        search: {
            provider: 'local'
        }
    }
})