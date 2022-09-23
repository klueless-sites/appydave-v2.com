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

// THIS CODE MAY BE A WAIST, It might be better to leave headings alone
interface IAstroHeading {
  depth: number;
  slug: string;
  text: string
}

// interface IHeading extends IAstroHeading {
//   parent: IHeading | null;
//   children: IHeading[];
// }

// class Heading implements IHeading {
//   depth: number;
//   slug: string;
//   text: string;
//   parent: IHeading | null;
//   children: IHeading[];

//   constructor(depth: number, slug: string, text: string, parent: IHeading | null) {
//     this.depth = depth;
//     this.slug = slug;
//     this.text = text;
//     this.parent = parent;
//     this.children = [];
//   }
// }

class Heading {
  depth: number;
  sequence: number;
  slug: string;
  text: string;
  parent: Heading | null;
  headings: Heading[] | null;

  constructor(depth: number, sequence: number, slug: string, text: string, parent: Heading | null = null) {
    this.depth = depth;
    this.sequence = sequence;
    this.slug = slug;
    this.text = text;
    this.parent = parent;
    this.headings = null;
  }

  parentName(): string {
    return this.parent?.text || 'NULL';
  }

  parent_up(): string {
    let result: string[] = [];
    let p: Heading | null = this;
    while (p != null) {
      result.push(p.parentName());
      p = p.parent;
    }

    // reverse sort
    return result.filter((x) => x).reverse().join(' > ');
  }

  debug(label: string = 'xxx'): void {
    console.log(`- ${label} ------------------------------------------------------------`);
    console.log(`depth : ${this.depth}`);
    console.log(`sequence : ${this.sequence}`);
    console.log(`text  : ${this.text}`);
    console.log(`parent: ${this.parent_up()}`);
    console.log(`child count: ${this.headings ? this.headings.length : 0}`);
    console.log(`headings: ${this.headings?.map((h) => h.text).join(', ')}`); 
  }

  to_h(): any {
    let result: any = {
      depth: this.depth,
      sequence: this.sequence,
      text: this.text,
      parent: this.parentName(),
    };

    if (this.headings) {
      result.headings = this.headings.map((h) => h.to_h());
    }
      
    return result;
  }
}
// // Table of contents as Nested Object from Headings 1 through 6
// export function getTocFromHeadings2(headings: IAstroHeading[], startDepth: number = 1): IHeading[] {
//   const toc: IHeading[] = [];
//   let current = toc;
//   let lastDepth = startDepth;
//   for (const heading of headings) {
//     // console.log(heading.text);
//     // console.log(heading.depth, lastDepth);
//     if (heading.depth > lastDepth) {
//       current = current[current.length - 1].children;
//     } else if (heading.depth < lastDepth) {
//       current = toc;
//       for (let i = 0; i < heading.depth - 1; i++) {
//         current = current[current.length - 1].children;
//       }
//     }
//     current.push(new Heading(heading.depth, heading.slug, heading.text));
//     lastDepth = heading.depth;
//   }
//   return toc;
// }

export default function getTocFromHeadings(astroHeadings: IAstroHeading[], _startDepth: number = 1): IHeading[] {
  const toc: IHeading[] = [];

  if (astroHeadings.length === 0) {
    return toc;
  }

  let parent: IHeading | null = null;
  let currentList: IHeading[] = toc;
  let depth: number = astroHeadings[0].depth;

  for (const astroHeading of astroHeadings) {
    let heading: IHeading = new Heading(astroHeading.depth, astroHeading.slug, astroHeading.text, parent);

    if (astroHeading.depth === depth) {
      console.log('=', astroHeading.text, `depth: ${astroHeading.depth}`);
      currentList.push(heading);
      console.log(currentList.length, currentList.map((h) => h.text).join(', '));
    } else if (astroHeading.depth > depth) {
      console.log('>', astroHeading.text, `depth: ${astroHeading.depth}`);
      depth = astroHeading.depth;
      parent = heading;
      currentList = heading.children;
      currentList.push(heading);
      console.log(currentList.length, currentList.map((h) => h.text).join(', '));
    } else if (astroHeading.depth < depth) {
      console.log('<', astroHeading.text, `depth: ${astroHeading.depth}`);

      if (parent === null) {
        console.log('parent is null');
      }
      else {
        console.log('parent is NOT null');
        depth = parent.depth;
        currentList = parent.children;
        parent = parent.parent;
        console.log(currentList.length, currentList.map((h) => h.text).join(', '));
      }
    }
  }

  return toc;
}
