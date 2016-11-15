module.exports = {
  port: process.env.PORT || 3000,
  db: {
    test_url: 'mongodb://localhost/App_test',
    url: process.env.MONGODB_URL || 'mongodb://localhost/App'
  },
  secret: "thesecrettothis"
}
