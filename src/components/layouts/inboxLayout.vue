<template>
  <section>
    <SideNav />

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
import SideNav from "../ui/SideNav";

export default {
  name: "inboxLayout",
  components: {
    Empty,
    SideNav
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
</style>