import formidable from "formidable";
import { IncomingMessage } from "http";

export const parseForm = (
  req: IncomingMessage
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({ multiples: false }); // No need for 'new' keyword in v3

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};
