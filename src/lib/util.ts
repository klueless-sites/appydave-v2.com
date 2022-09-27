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

export async function topicNavigation(file: string): Promise<any> {
  const configFile = topicNavigationPath(file);

  if (!fs.existsSync(configFile)) {
    return DEFAULT_NAVIGATION;
  }

  const json = await fsp.readFile(configFile, 'utf-8');
  const data = JSON.parse(json);
  // console.log(JSON.stringify(data, null, 2));
  return data;
}


export function topicNavigationPath(file: string): string {
  // console.log('pageSubpath(file)       :', pageSubpath(file));
  const result = path.join(basePagePath(), pageSubpath(file), 'navigation.json');

  return result;
}

// File should be the page file with .md
export function pageSubpath(file: string): string {
  // console.log('----------------------------------------------------------------------');
  // console.log('pageSubpath.file        :', file);
  console.log('basePagePath            :', basePagePath());
  
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