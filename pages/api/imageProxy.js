export default async ({ query }, response) => {
  fetch(decodeURIComponent(query.url)).then(({ body }) => {
    body.pipe(response);
  });
};
