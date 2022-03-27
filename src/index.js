import VueMarkowndDoc from './components/vue-markdown-doc.vue'

VueMarkowndDoc.install = (Vue) => {
    Vue.component('vue-markdown-doc', VueMarkowndDoc)
}

export default VueMarkowndDoc