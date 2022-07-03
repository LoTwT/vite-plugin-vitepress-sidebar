import { defineConfig } from "vitepress"

export default defineConfig({
  title: "VitePluginVitepressSidebar",
  lastUpdated: true,
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/lotwt/vite-plugin-vitepress-sidebar",
      },
    ],

    nav: [
      { text: "Guide", link: "/guide/getting-started", activeMatch: "/guide/" },
      {
        text: "Configs",
        link: "/config/introduction",
        activeMatch: "/config/",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          collapsible: true,
          items: [
            {
              text: "Getting Started",
              link: "/guide/getting-started",
            },
            {
              text: "Configuration",
              link: "/guide/configuration",
            },
          ],
        },
      ],
      "/config/": [
        {
          text: "Config",
          collapsible: true,
          items: [
            {
              text: "Introduction",
              link: "/config/introduction",
            },
          ],
        },
      ],
    },
  },
})