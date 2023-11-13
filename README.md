# ts-classes-to-api-documentation
This TypeScript repository is designed to generate and update API documentation in Markdown format. It utilizes a TsFileParser to extract information from a TypeScript file and a MdWriter to write the documentation to a specified Markdown file.

## Usage
#### Clone repository from gitHub:
```
https://github.com/SerhiyGuivan/ts-classes-to-api-documentation.git
```

#### Install npm packages:
```
npm install
```

#### Check example folder

Here you can place your TypeScript file for generating and writing API documentation in the README file. By default, an index.d.ts file has already been added for testing purposes.

Check the `README.md` file in the example folder. It should look like this:

```md
<!-- START CLASS API: SinglyLinkedList -->
<!-- END CLASS API: SinglyLinkedList -->

<!-- START CLASS API: DoublyLinkedList -->
<!-- END CLASS API: DoublyLinkedList -->

<!-- START CLASS API: Queue -->
<!-- END CLASS API: Queue -->

<!-- START CLASS API: Stack -->
<!-- END CLASS API: Stack -->
```

Clean the file and add a new comment if you've added your TypeScript file. The comment structure should be:

```md
<!-- START CLASS API: **YOUR_API_CLASSNAME** -->
<!-- END CLASS API: **YOUR_API_CLASSNAME** -->
```

#### Check index.ts file in src folder

```ts
import { MdWriter } from './md-writer/md-writer';

const TS_FILE_PATH: string = './example/index.d.ts';
const MD_FILE_PATH: string = './example/README.md';

const mdWriter:MdWriter = new MdWriter(TS_FILE_PATH, MD_FILE_PATH);

(async () => {
  await mdWriter.writeApiClassContent('SinglyLinkedList');
  await mdWriter.writeApiClassContent('DoublyLinkedList');
  // await mdWriter.writeApiClassContent('Stack');
  // await mdWriter.writeApiClassContent('Queue');
})();
```

- Update the value for `TS_FILE_PATH` on the 3rd line if you've added your own ts file.
- Clean the body of the async function and add your own `await mdWriter.writeApiClassContent('**YOUR_API_CLASSNAME**');` if you are using your own TypeScript file. 

#### Run npm commands: 
```
npm run build
npm run run
```

If everything is correct, you should see an updated `README.md` file in the example folder with the provided API documentation for classes.