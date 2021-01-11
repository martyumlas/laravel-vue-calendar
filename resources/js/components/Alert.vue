<template>
    <div v-if="message">
     <v-snackbar
      :timeout="2000"
      :value="true"
      absolute
      color="success"
      right
      top
    >
    {{message}}
    </v-snackbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed : mapGetters(['message'])

}
</script>

<style>

</style>