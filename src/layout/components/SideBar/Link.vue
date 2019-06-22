<template>
	<component v-bind="linkProp(to)">
		<slot></slot>
	</component>
</template>

<script>
import { isExternal } from '@/utils/validations'
export default {
  props: {
    to: {
      type: String,
      defautl: ''
    }
  },
  methods: {
    linkProp (url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_bank',
          rel: 'nopener'
        }
      }
      return {
        to: url,
        is: 'router-link'
      }
    }
  }
}
</script>

<style>
</style>
