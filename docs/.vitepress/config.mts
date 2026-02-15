import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "TS-AI API",
    description: "TS-AI 开发者 API 文档",
    lang: 'zh-CN',

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '开始使用', link: '/authentication' },
            { text: 'API 参考', link: '/image-generation' }
        ],

        sidebar: [
            {
                text: '入门',
                items: [
                    { text: '概述', link: '/overview' },
                    { text: '认证方式', link: '/authentication' }
                ]
            },
            {
                text: 'API 端点',
                items: [
                    { text: '查询余额', link: '/user-balance' },
                    { text: '图像生成', link: '/image-generation' },
                    { text: '视频生成', link: '/video-generation' },
                    { text: '任务状态查询', link: '/task-status' }
                ]
            },
            {
                text: '进阶',
                items: [
                    { text: '工作流详解', link: '/workflows' },
                    { text: '错误码参考', link: '/error-codes' }
                ]
            },
            {
                text: '示例代码',
                items: [
                    { text: 'cURL', link: '/examples-curl' },
                    { text: 'Python', link: '/examples-python' },
                    { text: 'JavaScript', link: '/examples-javascript' }
                ]
            },
            {
                text: '附录',
                items: [
                    { text: '费用说明', link: '/pricing' },
                    { text: '数据库结构', link: '/database' }
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
