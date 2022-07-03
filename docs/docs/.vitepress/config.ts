import { defineConfig } from "vitepress"
import VitepressSidebar from "vite-plugin-vitepress-sidebar"

export default defineConfig({
  title: "VitePluginVitepressSidebar",
  lastUpdated: true,

  vite: {
    plugins: [VitepressSidebar()],
  },

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
              // text: "Getting Started",
              text: "",
              link: "/guide/getting-started",
            },
            {
              // text: "Configuration",
              text: "",
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
              // text: "Introduction",
              text: "",
              link: "/config/introduction",
            },
          ],
        },
      ],
    },
  },
})
