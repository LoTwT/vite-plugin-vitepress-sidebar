import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { Plugin, ResolvedConfig } from "vite"
import type { UserConfig, DefaultTheme } from "vitepress"

export default function VitepressSidebarPlugin(): Plugin {
  let config: ResolvedConfig
  let isGenerated = false

  return {
    name: "vitepress-sidebar",

    configResolved(c) {
      config = c
    },

    async buildStart() {
      if (isGenerated) return
      isGenerated = true

      const root = config.root
      const vitepressConfigPath = join(root, ".vitepress/config.ts")

      const vitepressConfig = (await import(
        vitepressConfigPath
      )) as UserConfig<DefaultTheme.Config>
      console.log(vitepressConfig)
      const sidebar = vitepressConfig.themeConfig?.sidebar

      if (sidebar === undefined) return

      if (Array.isArray(sidebar)) {
        await traverseSidebarGroups(sidebar, root)
      } else {
        for (const p in sidebar) {
          const sidebarGroups = sidebar[p]
          await traverseSidebarGroups(sidebarGroups, root)
        }
      }

      const vitepressConfigString = (
        await readFile(vitepressConfigPath)
      ).toString()

      const IMPORT_RE = /import (.*)\s/g

      const newConfigString =
        (vitepressConfigString.match(IMPORT_RE)?.join("") || "") +
        `\nexport default defineConfig(${JSON.stringify(
          vitepressConfig,
          null,
          2,
        )})`

      await writeFile(vitepressConfigPath, newConfigString)
    },
  }
}

const MD_TITLE_RE = /^# ?(.*)\s/

// todo change to use Promise.allSettled
const traverseSidebarGroups = async (
  sidebarGroups: DefaultTheme.SidebarGroup[],
  root: string,
) => {
  for (let i = 0; i < sidebarGroups.length; i++) {
    const group = sidebarGroups[i]

    for (let j = 0; j < group.items.length; j++) {
      const item = group.items[j]
      const mdPath = normalizeMdPath(root, item.link)
      const mdContent = (await readFile(mdPath)).toString()
      item.text = mdContent.match(MD_TITLE_RE)?.[1] || ""
    }
  }
}

const normalizeMdPath = (root: string, link: string) => join(root, link) + ".md"
