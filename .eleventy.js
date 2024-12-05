
// Example use for the demo plugin:
// {{ 'Steph' | hello | safe }}
import { transform } from "@astrojs/compiler";
import { writeFile, mkdir } from 'node:fs/promises';

/**
 * Currently creates the folder to store the typescript modules
 * Need to find a way to parse them to JS and import and run to return the necessary html
 * 
 * Need to learn more about how the node file stuff works
 * for whatever reason it's saying the file exists but I can't find it
 * it looks like the typescript code is legit
 */

export default (eleventyConfig, options) => {
  eleventyConfig.addTemplateFormats("astro")
  const hash = 'q7098aksjfhao'// arbitrary string
  eleventyConfig.addExtension('astro', {
    compile: async (str, inputPath) => {
      const folder = '.astro'+hash
      
      await mkdir(folder)

      // create a ts module that returns html
      const result = await transform(str, {
        filename: inputPath,
        internalURL: "astro/runtime/server/index.js",
      })

      
      const filePath = folder+inputPath.slice(1).split('/').at(-1)
      
      await writeFile(filePath.replace('.astro','.ts'), result.code)

      return async function() {
        const mod = await import('./'+filePath)
      }
    }
  })
};
