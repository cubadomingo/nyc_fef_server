import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Listening at http://localhost:${port}`);
  }
});
