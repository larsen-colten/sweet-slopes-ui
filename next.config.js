module.exports = {
    async redirects() {
      return [
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
      ]
    },
    images: {
      domains: ['items-images-production.s3.us-west-2.amazonaws.com'],
    }
  }