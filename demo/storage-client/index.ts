import {AlwatrStorageClient} from '@alwatr/storage-client';

import type {DocumentObject} from '@alwatr/storage-client';

interface User extends DocumentObject {
  fname: string;
  lname: string;
  email: string;
  token?: string;
}

const db = new AlwatrStorageClient<User>({
  name: 'user-list',
  host: 'http://127.0.0.1:80',
  token: 'alwatr_110_313',
  timeout: 2_000,
});

let ali = await db.get('alimd');

if (ali == null) {
  console.log('ali not found');
  ali = {
    _id: 'alimd',
    _updatedBy: 'demo',
    fname: 'Ali',
    lname: 'Mihandoost',
    email: 'ali@mihandoost.com',
  };
}
else {
  console.log('ali found: %o', ali);
  /**
   * {
   *   _id: 'alimd',
   *   fname: 'Ali',
   *   lname: 'MM',
   *   email: 'i@ali.md',
   * }
   */

  ali.token = Math.random().toString(36).substring(2, 15);
}

await db.set(ali);

await db.set({
  _id: 'fmd',
  _updatedBy: 'demo',
  fname: 'Fatemeh',
  lname: 'Mihandoost',
  email: 'Fatemeh@mihandoost.com',
  token: Math.random().toString(36).substring(2, 15),
});

console.log('keys: %o', await db.keys());
console.log('getAll: %o', await db.getAll());
console.log('delete: %o', await db.delete('alimd'));
console.log('delete: %o', await db.delete('fmd'));
try {
  await db.delete('abcd');
}
catch (err) {
  console.log('delete 404: %o', (err as Error).message);
}
