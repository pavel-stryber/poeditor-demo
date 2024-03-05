import fs from 'node:fs';
import path from 'node:path';
import {
  POEDITOR_API_TOKEN,
  POEDITOR_API_URL,
  POEDITOR_PROJECT_ID,
  TRANSLATIONS_FOLDER,
} from "./constants.mjs";

const pushTerms = async () => {
  const filePath = path.resolve(TRANSLATIONS_FOLDER, 'en.json');
  const file =  new Blob([await fs.readFileSync(filePath)]);
  const formData = new FormData();
  formData.append('api_token', POEDITOR_API_TOKEN);
  formData.append('id', POEDITOR_PROJECT_ID);
  formData.append('updating', 'terms');
  formData.append('file', file, 'en.json');
  return fetch(`${POEDITOR_API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
};

(async () => {
  const res = await pushTerms();
  const resData = await res.json();
  console.log('Therms uploaded');
})();
