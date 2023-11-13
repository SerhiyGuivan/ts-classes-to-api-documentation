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