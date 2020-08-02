module.exports = {
    base: `/multi-level-logger/`,
    title: `multi-level-logger`,
    description: `Enabling different logs with differing log levels within a single application`,
    themeConfig: {
        repo: `davehermann/multi-level-logger`,
        sidebar: [
            `/`,
            `/generated/Configuration`,
            `/generated/WritingLogs`,
            `/Examples`,
            `/MigratingFrom1x`,
        ],
        sidebarDepth: 2,
    },
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [2, 3, 4],
        },
    },
}
