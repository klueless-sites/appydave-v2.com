## Simple Hierarchy

## As markdown

```markdown
# Main heading
## Sub heading 1
### More info
## Sub heading 2
### Even more info
```

## As flat javascript array

```javascript
heading = [
  { depth: 1, text: 'Main heading' },
  { depth: 2, text: 'Sub heading 1' },
  { depth: 3, text: 'More info' },
  { depth: 2, text: 'Sub heading 2' },
  { depth: 3, text: 'Even more info' },
]
```

## As javascript hierarchy
```javascript
list_of_heading_heirachies = [
  { text: 'Main heading', headings: [
    { text: 'Sub heading 1', headings: [
      { text: 'More info', headings: [] },
    ] },
    { text: 'Sub heading 2', headings: [
      { text: 'Even more info', headings: [] },
    ] }
  ]}
]
```