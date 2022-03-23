function postJson<BodyType>(url: string, body: BodyType): Promise<Response> {
  const request = new Request(url);
  return fetch(request, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export { postJson };
