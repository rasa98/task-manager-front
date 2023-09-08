<template>
    <div class="menu-item" @click="isOpen = !isOpen" >
        <p>
            {{ title }}
        </p>
        <svg viewBox="0 0 1030 638" width="10">
            <path d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z" fill="#FFF"></path>
        </svg>
        <transition name="fade" apear>
         <div class="sub-menu" v-if="isOpen">
            <div class="menu-item" v-for="b in boards" :key="b.id">
              <router-link to="/board" @click="setCurrentBoard(b.id)">{{ b.name }}</router-link>
            </div>
            <!-- <div class="menu-item">
              <router-link to="/services/web">Web</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/services/design">Design</router-link>
            </div>
            <div class="menu-item">
              <router-link to="/services/videos">Videos</router-link>
            </div> -->
        </div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'boardDD',
  props: {
    title: String,    
  },
  data () {
    return {
        isOpen: false,
    }
  },
  computed: {        
    boards() {
        return this.$store.getters["userModule/getBoards"];

    },    
  },
  methods: {
        setCurrentBoard(id) {
            this.$store.dispatch("getBoardData", id);
        }
    }
}
</script>

<style>
nav .menu-item svg {
    width: 10px;
    margin-left: 10px;
}
nav .menu-item .sub-menu {
  position: absolute;
  background-color: #222;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.sub-menu {
  cursor: pointer;
}
</style>
