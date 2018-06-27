# vue-top-down

[![Build Status](https://travis-ci.org/MoYummy/vue-top-down.svg?branch=master)](https://travis-ci.org/MoYummy/vue-top-down)

[![NPM](https://nodei.co/npm/vue-top-down.png)](https://www.npmjs.com/package/vue-top-down)

With this, you can mount `Vue` components on some of the elements on a raw html as template, with original DOM hierarchy preserved.

Check out [demo](https://moyummy.github.io/vue-top-down/example/).

## Usage

~~~javascript
import { VueTopDown, VTDConstants as VTD } from 'vue-top-down'
import OneComponent from 'path/to/one/component'

const StructComp = {
  mixins: [VueTopDown],
  components: {
    OneComponent
  },
  data () {
    return {
      [VTD.ROOT]: '.selector.of.hosting.element', // in case you want to skip some dom node levels
      [VTD.MAPPING]: {
        '.selector.for.one.component': OneComponent
      }
    }
  }
}
~~~

~~~javascript
import { VueTopDownItem } from 'vue-top-down'

export default {
  name: 'OneComponent',
  mixins: [VueTopDownItem], // with this, you can handle 'clazz' / 'outerHTML'
  inheritAttrs: false
}
~~~

