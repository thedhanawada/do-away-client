<template>
  <section>
    <Modal v-if="isModalActive" @onclose="hideModal">
      <h3 class="title is-3">Info</h3>
      <ul>
        <li>
          <a href>Docs URL</a>
        </li>
         <li>
          <a href>GitHub Repo</a>
        </li>
      </ul>
      <br />
      <h3 class="title is-3">Other Tools</h3>
      <ul>
        <li>
          <a href="https://revealurl.xyz">Reveal URL</a>
        </li>
      </ul>
    </Modal>
    <nav>
      <div class="nav-top">
        <router-link to="/">
          <span class="icon">
            <i class="logo logo-short"></i>
          </span>
        </router-link>
      </div>
      <div class="nav-bottom">
        <li  @click="showModal">
          <ion-icon name="ios-information-circle-outline" size="large" class="has-text-dark"></ion-icon>
        </li>
      </div>
    </nav>

    <div class="inbox_body">
      <div class="email_list">
        <slot name="email_list">
          <p>
            Send an email to
            <strong>{{$route.params.email}}@doaway.email</strong> to see the mails here
          </p>
        </slot>
      </div>
      <div class="email_view">
        <slot name="email_view">
          <Empty />
        </slot>
      </div>
    </div>
  </section>
</template>
<script>
import Empty from "../ui/Empty";
import Modal from "../ui/Modal";

export default {
  name: "inboxLayout",
  data() {
    return {
      isModalActive: false
    };
  },
  components: {
    Empty,
    Modal
  },
  methods: {
    showModal() {
      this.isModalActive = true;
    },
    hideModal() {
      this.isModalActive = false;
    }
  }
};
</script>
<style scoped>
section {
  display: flex;
  flex-direction: row;
}

nav {
  width: 64px;
  height: 100vh;
  background-color: #fff;
}

.inbox_body {
  width: calc(100vw - 64px);
  height: 100vh;
  display: flex;
}

.email_list {
  width: 25%;
  min-width: 320px;
  background-color: #f6eace;
  height: 100vh;
  padding: 32px;
  overflow-y: scroll;
}

.email_view {
  width: 75%;
  background: #fff;
  height: 100vh;
  border-left: 4px solid var(--primary-color);
}

nav {
  padding: 0px 16px;
}

.nav-top,
.nav-bottom {
  display: flex;
  flex-direction: column;
  position: fixed;
}

.nav-top {
  top: 12px;
}

.nav-bottom {
  bottom: 12px;
}

.icon {
  width: 40px;
  height: 40px;
}

li {
  list-style: none;
}
</style>