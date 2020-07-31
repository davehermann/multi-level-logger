module.exports = {
    title: `multi-level-logger`,
    description: `Enabling different logs with differing log levels within a single application`,
    themeConfig: {
        repo: `davehermann/multi-level-logger`,
        sidebar: [
            `/`,
            `/generated/Configuration`,
            `/MigratingFrom0x`,
        ],
    },
    markdown: {
        toc: {
            includeLevel: [2, 3, 4],
        },
    },
}
