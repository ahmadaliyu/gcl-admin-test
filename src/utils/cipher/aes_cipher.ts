import { cipher, util } from 'node-forge';

export function aes_encrypt({ rawText, key, iv }: { rawText: string; key: string; iv: string }) {
  const c = cipher.createCipher('AES-CBC', key);

  c.start({ iv });
  c.update(util.createBuffer(rawText, 'utf8'));
  c.finish();

  return util.encode64(c.output.getBytes());
}

export function aes_decrypt({ rawText, key, iv }: { rawText: string; key: string; iv: string }) {
  const d = cipher.createDecipher('AES-CBC', key);

  d.start({ iv });
  d.update(util.createBuffer(util.decode64(rawText)));
  d.finish();

  return d.output.toString();
}
