import path from 'node:path';
import fsp from 'node:fs/promises';
import fs from 'node:fs';

const DEFAULT_NAVIGATION = {
  sections: [
    {
      title: 'Introduction',
      links: []
    }
  ]
};

const QUICK_NAVIGATION = {
  sections: [
    {
      title: 'Quick Links',
      links: [
        {
          title: 'Home',
          href: '/'
        },
        {
          title: 'astrojs',
          href: '/astrojs'
        },
        {
          title: 'Faker with Factorybot',
          href: '/ruby/gems/faker-with-factory-bot'
        },
        {
          title: 'Javascript',
          href: '/javascript'
        },
        {
          title: 'Ideas',
          href: '/ideas'
        },
        {
          title: 'Deep -> Hello',
          href: '/deep/hello'
        }
      ]
    }
  ]
}

export async function topicNavigation(file: string): Promise<any> {
  const configFile = topicNavigationPath(file);

  let data = structuredClone(DEFAULT_NAVIGATION);

  if (fs.existsSync(configFile)) {
    const json = await fsp.readFile(configFile, 'utf-8');
    data = JSON.parse(json);
  }

  data.sections.push(...QUICK_NAVIGATION.sections);
  // console.log(data.sections.length);
  // console.log(JSON.stringify(data, null, 2));
  
  return data;
}

export function topicNavigationPath(file: string): string {
  const result = path.join(basePagePath(), pageSubpath(file), 'navigation.json');

  return result;
}

// File should be the page file with .md
export function pageSubpath(file: string): string {
  // console.log('----------------------------------------------------------------------');
  // console.log('pageSubpath.file        :', file);
  // console.log('basePagePath            :', basePagePath());
  
  // console.log('basename                 :', path.basename(file));
  // console.log('basename (-ext)          :', path.basename(file, '.md'));
  // console.log('dirname                  :', path.dirname(file));
  // console.log('extname                  :', path.extname(file));
  // console.log('isAbsolute               :', path.isAbsolute(file));
  // const pages = new URL('../pages/', import.meta.url);
  // console.log('relative                 :', path.relative(file, pages.pathname));
  // console.log('relative_dir             :', path.dirname(file).substring(pages.pathname.length));
  return path.dirname(file).substring(basePagePath().length);
}

export function basePagePath(): string {
  const result = new URL('../pages/', import.meta.url).pathname;
  // console.log('basePagePath            :', result);
  // console.log(result === '/Users/davidcruwys/dev/sites/appydave-v2.com/src/pages/' ? "GOOD" : "******* BAD *******");
  if (result !== '/Users/davidcruwys/dev/sites/appydave-v2.com/src/pages/') {
    console.log("******* BAD *******");
  }
  return result;
}
