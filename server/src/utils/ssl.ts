
import * as fs from 'fs';
import { BgGreen, BgYellow, FgRed, Reset } from '../constants/console';
/**
 * Obtiene la configuración del protocolo del servidor, http o https según si encuentra los certificados o no.
 * @returns Devuelve los parámetros para la configuración del protocolo
 */
export function getProtocolConfig(pKey, _cert) {
  let key: string | Buffer = '';
  let cert: string | Buffer = '';
  let protocol: 'http' | 'https' | undefined;
  if (pKey && _cert)
    try {
      console.log(`Config ${BgGreen}HTTPS${Reset} Protocol...`);
      key = fs.readFileSync(pKey);
      cert = fs.readFileSync(_cert);
      protocol = 'https';
    } catch (error) {
      protocol = undefined;
      console.log(`${FgRed}Failed to config HTTPS Protocol${Reset}`);
      console.error(error);
    }
  if (!protocol) {
    console.log(`Config ${BgYellow}HTTP${Reset} Protocol...`);
    key = '';
    cert = '';
    protocol = 'http';
  }
  process.env.PROTOCOL = protocol;
  return { key, cert, protocol };
}
