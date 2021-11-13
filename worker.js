addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function makeRandomKey() {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 7; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const foundIt = await HUCHUKV.get(key);
  if (foundIt) {
    return makeRandomKey();
  }
  return key;
}

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);
  if (request.method === "GET") {
    let key = searchParams.get("key");
    if (!key) {
      return new Response(null, { status: 400 });
    }
    const url = await HUCHUKV.get(key);
    if (!url) {
      return Response(null, { status: 400 });
    }
    return Response.redirect(url, 301);
  } else if (request.method === "POST") {
    let headers = new Headers({
      "Access-Control-Allow-Origin": "https://huchu.link",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    });
    let url = searchParams.get("url");
    if (!url) {
      return new Response(null, { status: 400, headers });
    }
    if (!url.includes("http")) {
      url = `http://${url}`;
    }
    await fetch(url).catch(() => {
      return new Response(null, { status: 400, headers });
    });
    const newKey = await makeRandomKey();
    await HUCHUKV.put(newKey, url);
    return new Response(JSON.stringify({ key: newKey }), {
      status: 200,
      headers,
    });
  }
}
