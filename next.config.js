/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path",
        destination: "https://huchu.nomadcoders.workers.dev?key=:path",
        permanent: true,
      },
    ];
  },
};
