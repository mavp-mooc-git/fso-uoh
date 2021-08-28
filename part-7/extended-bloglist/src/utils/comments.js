const storageKey = 'commentsBlogApp'

const initComments = (data) =>
  localStorage.setItem(storageKey, JSON.stringify(data))

const loadComments = () =>
  JSON.parse(localStorage.getItem(storageKey))

const fns = {
  initComments,
  loadComments
}

export default fns
