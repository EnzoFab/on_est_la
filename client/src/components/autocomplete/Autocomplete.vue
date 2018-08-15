<template class="autocomplete">
  <div>
    <v-text-field
          label="Solo"
          placeholder="Balance ton sauce"
          solo
          v-model="search"
          @input="onChange"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keydown.enter="onEnter"
    ></v-text-field>
    <friendlist v-show="isOpen" :friendlist="results" :isSearchable="false" :sizeInput="400"></friendlist>
  </div>
</template>

<script>
import Friendlist from '../friendlist/Friendlist'

export default {
  name: 'Autocomplete',
  components: {
    friendlist: Friendlist
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      search: '',
      results: [],
      isOpen: false,
      isLoading: false,
      arrowCounter: -1
    }
  },
  methods: {
    onArrowDown: function onArrowDown () {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp: function onArrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter: function onEnter () {
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
    onChange: function onChange () {
      this.isOpen = true
      this.filterResults()
      // Warn the parent that a change was made
      this.$emit('input', this.search)
      // Is the data given by an outside ajax request ?
      if (this.isAsync) {
        this.isLoading = true
      } else {
        // Data is sync, we can search our flat array
        this.filterResults()
        this.isOpen = true
      }
    },
    filterResults: function filterResults () {
      // this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
    },
    setResult: function setResult (result) {
      this.search = result
      this.isOpen = false
    }
  },
  watch: {
    // Once the items content changes, it means the parent component
    // provided the needed data
    items: function update (value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value
        this.isOpen = true
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
