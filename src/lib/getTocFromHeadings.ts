// Table of Contents as Markdown
// # Heading
// ## Sub heading A
// ## Sub heading B
// ## Sub heading C
// ### Sub - Sub heading C-A
// ### Sub - Sub heading C-B
// #### Sub - Sub - Sub heading C-B-1
// #### Sub - Sub - Sub heading C-B-2
// ##### 5th level heading C-B-2-A
// ##### 5th level heading C-B-2-B
// ###### 6th level heading C-B-2-B-AAA
// ###### 6th level heading C-B-2-B-BBB
// #### Sub - Sub - Sub heading C-B-3
// ### Sub - Sub heading C-B
// ## Sub heading D

// Table of Contents as Astro Array
// headings = [
// { depth: 1, slug: 'heading', text: 'Heading' },
// { depth: 2, slug: 'sub-heading-a', text: 'Sub heading A' },
// { depth: 2, slug: 'sub-heading-b', text: 'Sub heading B' },
// { depth: 2, slug: 'sub-heading-c', text: 'Sub heading C' },
// { depth: 3, slug: 'sub---sub-heading-c-a', text: 'Sub - Sub heading C-A' },
// { depth: 3, slug: 'sub---sub-heading-c-b', text: 'Sub - Sub heading C-B' },
// { depth: 4, slug: 'sub---sub---sub-heading-c-b-1', text: 'Sub - Sub - Sub heading C-B-1' },
// { depth: 4, slug: 'sub---sub---sub-heading-c-b-2', text: 'Sub - Sub - Sub heading C-B-2' },
// { depth: 5, slug: '5th-level-heading-c-b-2-a', text: '5th level heading C-B-2-A' },
// { depth: 5, slug: '5th-level-heading-c-b-2-b', text: '5th level heading C-B-2-B' },
// { depth: 6, slug: '6th-level-heading-c-b-2-b-aaa', text: '6th level heading C-B-2-B-AAA' },
// { depth: 6, slug: '6th-level-heading-c-b-2-b-bbb', text: '6th level heading C-B-2-B-BBB' },
// { depth: 4, slug: 'sub---sub---sub-heading-c-b-3', text: 'Sub - Sub - Sub heading C-B-3' },
// { depth: 3, slug: 'sub---sub-heading-c-b-1', text: 'Sub - Sub heading C-B' },
// { depth: 2, slug: 'sub-heading-d', text: 'Sub heading D' }
// ]

interface IAstroHeading {
  depth: number;
  slug: string;
  text: string
}

interface IHeading {
  slug: string;
  text: string;
  children: IHeading[];
}

class Heading implements IHeading {
  slug: string;
  text: string;
  children: IHeading[];

  constructor(slug: string, text: string) {
    this.slug = slug;
    this.text = text;
    this.children = [];
  }
}

// Table of contents as Nested Object from Headings 1 through 6
export default function createTocFromHeadings(headings: IAstroHeading[]) {
  const toc: IHeading[] = [];
  let current = toc;
  let lastDepth = 1;
  for (const heading of headings) {
    // console.log(heading.text);
    // console.log(heading.depth, lastDepth);
    if (heading.depth > lastDepth) {
      current = current[current.length - 1].children;
    } else if (heading.depth < lastDepth) {
      current = toc;
      for (let i = 0; i < heading.depth - 1; i++) {
        current = current[current.length - 1].children;
      }
    }
    current.push(new Heading(heading.slug, heading.text));
    lastDepth = heading.depth;
  }
  return toc;
}
