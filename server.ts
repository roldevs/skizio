// tslint:disable:no-console
import Bluebird from 'bluebird';
import bodyParser from 'body-parser';
import compression from 'compression';  // compresses requests
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import express from 'express';
import session from 'express-session';
import lusca from 'lusca';
import morgan from 'morgan';
import path from 'path';
import routes from './src/server/routes';

const title = process.env.APP_NAME;
const dsn: string = process.env.SENTRY_DNS!;

dotenv.config();

// Sentry.init({  dsn });

process.env.PWD = process.cwd();
const staticsFolder = path.join(process.env.PWD!, '/public');
const app = express();

app.use(errorhandler());
app.set('port', process.env.PORT || 3000);
// app.set('views', 'src/views');
// app.set('view engine', 'pug');
// app.use(morgan('combined'));
// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.SESSION_SECRET!,
// }));
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
// app.use(express.static(staticsFolder));

// app.use(
//   express.static(staticsFolder, { maxAge: 31557600000 }),
// );

app.use('/api', routes);

app.get('/', (_, res: any) => res.render('home', { title }));

app.listen(app.get('port'), () => {
  console.log(staticsFolder);
  console.log('Skizo app listening on port ' + app.get('port') + '!');
});
