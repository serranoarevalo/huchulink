/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path",
        destination:
          "https://spring-sun-2067.nomadcoders.workers.dev?key=:path",
        permanent: true,
      },
    ];
  },
};
