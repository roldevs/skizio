import Bluebird from 'bluebird';
import ua from 'universal-analytics';

const trackEvent: (page: string, title: string) => Bluebird<any> =
(page, title) => {
  const visitor = ua(process.env.GA_ID!);

  return new Bluebird((resolve: any, reject: any) => {
    const result = visitor.pageview(page, title, reject);
    resolve(result);
  });
};

export default trackEvent;
