import fs from 'node:fs';
import path from 'node:path';
import {
  POEDITOR_API_URL,
  POEDITOR_API_TOKEN,
  POEDITOR_PROJECT_ID,
  POEDITOR_EXPORT_FORMAT,
  TRANSLATIONS_FOLDER,
  LANGUAGES,
} from './constants.mjs';
const getTranslationFileURL = async (language) => {
  const res = await fetch(`${POEDITOR_API_URL}/export`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      api_token: POEDITOR_API_TOKEN,
      id: POEDITOR_PROJECT_ID,
      language,
      type: POEDITOR_EXPORT_FORMAT
    }).toString(),
  });
  const json = await res.json();
  return json.result.url;
};

const fetchTranslationFile = async (url) => {
  const res = await fetch(url);
  const text = await res.text();
  return text;
};

const pullTranslationFile = async (language) => {
  const translationFileURL = await getTranslationFileURL(language);
  const text = await fetchTranslationFile(translationFileURL);
  const filePath = path.resolve(TRANSLATIONS_FOLDER, `${language}.json`);
  fs.writeFileSync(filePath, text);
  return filePath;
}

(async () => {
  const pullTranslationFilePromises = LANGUAGES.map(language => pullTranslationFile(language));
  await Promise.all(pullTranslationFilePromises);
  console.log('Translations updated');
})();
