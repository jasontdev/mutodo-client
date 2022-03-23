async function postJson<RequestBody, ResponseBody>(
  url: string,
  body: RequestBody
): Promise<ResponseBody> {
  return new Promise((resolve, reject) => {
    const request = new Request(url);
    fetch(request, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        resolve(response.json());
      } else {
        reject(response.status);
      }
    });
  });
}

export { postJson };
