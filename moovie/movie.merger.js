module.exports = {
  mergeOldAndNew: (old, incoming) => ({
    ...old,
    ...incoming,
    Ratings: new Set([...old.Ratings, incoming.Ratings]),
  }),
};
