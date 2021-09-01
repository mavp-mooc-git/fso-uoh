const storageKey = 'commentsBlogApp'

const initComments = (data) =>
  localStorage.setItem(storageKey, JSON.stringify(data))

const loadComments = () =>
  JSON.parse(localStorage.getItem(storageKey))

const saveComments = (data) =>
  localStorage.setItem(storageKey, JSON.stringify(data))

const fns = {
  initComments,
  loadComments,
  saveComments
}

export default fns
