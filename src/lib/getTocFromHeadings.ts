// Building Table of Contents from Headings in a Markdown File
// # H1
// ## H2 A
// ## H2 B
// ## H2 C
// ### H3 C-A
// ### H3 C-B
// #### H4 C-B-1
// # H1 (AGAIN)
// ### H3 C-B
// ## Sub heading D
// ### H3 D-A
// ### H3 D-B

// Table of Contents as Astro Array
// headings = [
//   { depth: 1, text: 'H1', children: [] },
//   { depth: 2, text: 'H2 A', children: [] },
//   { depth: 2, text: 'H2 B', children: [] },
//   { depth: 2, text: 'H2 C', children: [] },
//   { depth: 3, text: 'H3 C-A', children: [] },
//   { depth: 3, text: 'H3 C-B', children: [] },
//   { depth: 4, text: 'H4 C-B-1', children: [] },
//   { depth: 1, text: 'H1 (AGAIN)', children: [] },
//   { depth: 3, text: 'H3 C-B', children: [] },
//   { depth: 2, text: 'Sub heading D', children: [] },
//   { depth: 3, text: 'H3 D-A', children: [] },
//   { depth: 3, text: 'H3 D-B' }
// ]
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

  debug(label: string = 'Debug Heading'): void {
    console.log(`- ${label} ------------------------------------------------------------`);
    console.log(`depth      : ${this.depth}`);
    console.log(`sequence   : ${this.sequence}`);
    console.log(`text       : ${this.text}`);
    console.log(`parent     : ${this.parent_up()}`);
    console.log(`child count: ${this.headings ? this.headings.length : 0}`);
    console.log(`headings   : ${this.headings?.map((h) => h.text).join(', ')}`); 
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

export class TocBuilder {
  raw_headings: any[];
  root: Heading[];
  recent_heading_by_depth: (Heading | null)[];

  constructor(raw_headings: any[]) {
    this.root = [];
    this.raw_headings = raw_headings;
    this.recent_heading_by_depth = Array(6).fill(null);
    console.log(`raw_headings: ${raw_headings.length}`);
    console.log(raw_headings);
  }

  build(): void {
    this.raw_headings.forEach((raw_heading: any, i: number) => {
      let heading = new Heading(raw_heading.depth, i,  raw_heading.slug, raw_heading.text);

      console.log(`processing #${i} - depth: ${heading.depth}, text: ${heading.text}`);

      if (heading.depth == 1) {
        this.root.push(heading);
      } else {
        let parent = this.find_closest_parent(heading);

        if (parent) {
          heading.parent = parent;

          if (parent.headings == null) {
            parent.headings = [];
          }
          parent.headings.push(heading);
        }
      }


      this.recent_heading_by_depth[heading.depth-1] = heading;
    });
  }

  find_closest_parent(heading: Heading): Heading | null {
    let depth = heading.depth-2;
    
    if (depth < 0) {
      return null;
    }

    console.log(`find_closest_parent: depth: ${depth}, text: ${heading.text}`);
    this.debug_recent_heading_by_depth();
    heading.debug();

    console.log('1xxxxxx')
    console.log(this.recent_heading_by_depth)
    console.log('2xxxxxx')
    console.log(this.recent_heading_by_depth.slice(0, depth))
    console.log('3xxxxxx')
    console.log(this.recent_heading_by_depth.slice(0, depth).filter(n => n))
    console.log('4xxxxxx')

    const limitHeadings = this
      .recent_heading_by_depth
      .slice(0, depth) // only use headings at depths lower then current heading
      .filter(n => n); // remove buckets that have not been set yet

    if (limitHeadings.length == 0) {
      return null;
    }

    console.log(limitHeadings);
    
    // The nearest heading is the heading with the highest sequence
    return limitHeadings.reduce((prev, current) => prev!.sequence > current!.sequence ? prev : current);
  }

  toc(): any {
    return {
      "headings": this.root.map((h) => h.to_h())
    };
  }
  
  debug_recent_heading_by_depth(): void {
    this.recent_heading_by_depth.forEach((item, i) => {
      console.log(`recent_heading_by_depth[${i}]: ${item == null ? 'NOT SET' : item.text}`);
    });
  }
}