<script>
import { VueTopDown, VTDConstants as VTD } from 'vue-top-down'
import ContentComp from './Content'

export default {
  mixins: [VueTopDown],
  components: {
    ContentComp
  },
  data () {
    return {
      [VTD.MAPPING]: {
        '.content': ContentComp
      }
    }
  }
}
</script>
