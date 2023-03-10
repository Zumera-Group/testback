import { renderToStaticMarkup } from 'react-dom/server';
// import pdf from 'html-pdf';
import axios from 'axios';

export const componentToPDFBuffer = (component) => {
  return new Promise((resolve, reject) => {
    const html = renderToStaticMarkup(component);

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '0',
      footer: {
        height: '0',
      },
      type: 'pdf',
      timeout: 30000,
      localUrlAccess: true,
      phantomArgs: ['--ignore-ssl-errors=yes'],
    };
    return null;
    // return pdf.create(html, options).toBuffer((err, buffer) => {
    //   if (err) {
    //     return reject(err);
    //   }
    //
    //   return resolve(buffer);
    // });
  });
};

const BASE_URL = 'https://zumera-frontend-staging.herokuapp.com/static/pdf/';
// const BASE_URL = 'http://localhost:3000/static/pdf/';

export const getPDFUrl = (url: string) => `${BASE_URL}${url}`;

export const getBase64FromImage = async (urlImg: string) => {
  const image = await axios.get(urlImg, {
    responseType: 'arraybuffer',
  });

  return `data:image/png;base64,${Buffer.from(image.data).toString('base64')}`;
};
