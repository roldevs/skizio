// tslint:disable:no-console
const axios = require('axios');
const Bluebird = require('bluebird');
const dotenv = require('dotenv');
const R = require('ramda');
const fs = require('fs');
const yaml = require('js-yaml');

dotenv.config();

const ages = ['young-adult', 'adult', 'elderly'];
const genders = ['male', 'female'];
const perPage = 100;
const pages = R.times(R.identity, 5);

const getImages = ({ age, gender, perPage, page }) => {
  const imageUrl =
    `https://api.generated.photos/api/v1/faces?per_page=${perPage}&page=${page}&gender=${gender}&age=${age}`;

  console.log(imageUrl);

  const requestOpts = { headers: { Authorization: `API-Key ${process.env.GENERATED_PHOTOS_KEY}` } };

  const request = () => axios.get(imageUrl, requestOpts);

  const getFaces = R.view(R.lensPath(['data', 'faces']));
  const getUrlValues = R.compose(R.values, R.nth(3), R.view(R.lensProp('urls')));
  const getUrls = R.map(getUrlValues);
  const getUrl = R.compose(R.flatten, getUrls);
  return request().then(getFaces).then(getUrl);
};

const writeYaml = (gender) => (data) => {
  console.log(data);
  fs.writeFileSync(
    `./src/lib/rats/data/images/${gender}.txt`,
    data.join('\n'),
    'utf8'
  );
};

R.forEach((gender) => {
  Bluebird.map(ages,
    (age) => {
      return Bluebird.map(pages, (page) => getImages({ age, gender, perPage, page: page + 1 }));
    }).then(R.flatten).then(writeYaml(gender));
}, genders);
