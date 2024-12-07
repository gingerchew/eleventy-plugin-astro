
// Example use for the demo plugin:
// {{ 'Steph' | hello | safe }}
import { transform, compile } from "@astrojs/compiler";
import { experimental_AstroContainer } from "astro/container";
import mdxRenderer from '@astrojs/mdx/server.js'
// import { writeFile, mkdir } from 'node:fs/promises';

/**
 * Currently creates the folder to store the typescript modules
 * Need to find a way to parse them to JS and import and run to return the necessary html
 * 
 * Need to learn more about how the node file stuff works
 * for whatever reason it's saying the file exists but I can't find it
 * it looks like the typescript code is legit
 */
const container = await experimental_AstroContainer.create()
container.addServerRenderer({ renderer: mdxRenderer })

export default (eleventyConfig, options) => {
  eleventyConfig.addTemplateFormats("astro")
  
  eleventyConfig.addExtension('astro', {
    compile: async (str, inputPath) => {
      
      // create a ts module that returns html
      const transformed = await transform(str, {
        filename: inputPath
      })
      const module = await compile(transformed.code)
      console.log(module)
      // const parsed = await parse(Mod.code)
      // console.log(module)

      // const html = await container.renderToString(Mod.code);
      
      return async function() {
        return ' '
      }
    }
  })
};
