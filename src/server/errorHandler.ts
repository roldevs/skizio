import { join } from 'path';
import * as R from 'ramda';

const errorHandler = (res: any, env: any) => {
  const message: (err: any) => string =
  (err) => {
    if (env.NODE_ENV === 'production') {
      return 'Server error';
    }
    return err.message;
  };

  const error = (err: any) => res.status(500).json({sucess: false, message: message(err)});

  return {
    error,
  };
};

export default errorHandler;
