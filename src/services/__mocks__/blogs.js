let token = null

const blogs = [
  {
    _id: "111",
    title: "Testititle",
    author: "Testikirjoittaja",
    url: "",
    likes: 5,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: 'tester',
      name: 'Teuvo Testaaja'
    }
  },
  {
    _id: "222",
    title: "Testititle2",
    author: "Testikirjoittaja2",
    url: "",
    likes: 4,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "tester",
      name: 'Teuvo Testaaja'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }