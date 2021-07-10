import PageTools from '@/components/PageTool'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import screenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import Lang from './Lang'
import TagsView from './TagsView'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('screenFull', screenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('Lang', Lang)
    Vue.component('TagsView', TagsView)
    Vue.use(Print)
  }
}
