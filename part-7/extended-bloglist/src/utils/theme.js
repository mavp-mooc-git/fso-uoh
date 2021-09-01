const storageKey = 'themeBlogApp'

const saveTheme = (data) =>
  localStorage.setItem(storageKey, JSON.stringify(data))

const loadTheme = () =>
  JSON.parse(localStorage.getItem(storageKey))

const applyTheme = () => {
  const theme = loadTheme()
  const select = document.getElementById('themes')
    if(select){
      switch (theme.name) {
        case 'bootstrap':
          select.options[1].selected = true
          break
        case 'styled':
          select.options[2].selected = true
          break
        default:
          select.options[0].selected = true
          break
      }
    }
}

const fns = {
  saveTheme,
  loadTheme,
  applyTheme
}

export default fns
