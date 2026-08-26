import openNextWorker from "./.open-next/worker.js";

const worker = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.protocol === "http:" || url.hostname === "www.kubar.tech") {
      url.protocol = "https:";
      url.hostname = "kubar.tech";
      return Response.redirect(url.toString(), 308);
    }

    return openNextWorker.fetch(request, env, ctx);
  },
};

export default worker;
