const graphql = {
  query: async function (endpoint: string, accessToken: string, query: string) {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }).then((res) => res.json());
  },
};

export default graphql;
