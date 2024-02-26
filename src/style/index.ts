import initRem from 'init-rem'
import 'vant/lib/index.css'
import './app.scss'

initRem({
  designWidth: 375
})
export default {
  install: () => {}
}
export const createStyle = () => {
  return {
    install () {}
  }
}
