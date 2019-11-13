import { Canvas } from 'canvas';
import fs from 'fs';
import { IVEPCFactory, VEPC } from './src/lib/ve-pc';

const vepc: IVEPCFactory = VEPC({
  race: 'human',
  class: 'fighter',
  locale: 'en',
  root: './src/lib/ve-pc/',
  threeBonus: false,
  system: 've.jdr',
});

vepc.fillCanvas().then((canvas: Canvas) => {
  const out = fs.createWriteStream(__dirname + '/test.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  // tslint:disable-next-line:no-console
  out.on('finish', () =>  console.log('The PNG file was created.'));
});
