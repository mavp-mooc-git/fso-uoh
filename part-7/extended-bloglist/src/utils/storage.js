const storageKey = 'loggedBlogAppUser'

const saveUser = (user) =>
  localStorage.setItem(storageKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(storageKey))

const logoutUser = () =>
  localStorage.removeItem(storageKey)


/**
 * Fix import/no-anonymous-default-export:
 * Assign object to a variable before exporting as module default
 * */
//export default { saveUser, loadUser, logoutUser }

const fns = {
  saveUser,
  loadUser,
  logoutUser
}

export default fns
