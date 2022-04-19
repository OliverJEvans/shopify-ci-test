<template>
  <div class="container footer-links">
    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>Shop</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>

    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>The Journal</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>

    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>Company</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>

    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>Account</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>

    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>Location</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>

    <Accordion class="footer-link-group" :show-arrow="true">
      <template #header>Support</template>
      <template #body>
        <ul>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
          <li><a href="#">New collection</a></li>
        </ul>
      </template>
    </Accordion>
  </div>
</template>

<script>
import Accordion from "@/components/FooterLinks.vue";

export default {
  components: {
    Accordion,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.footer-links {
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: $color-light;
}

.footer-link-group {
  ::v-deep(.accordion__header) {
    background: none;
    outline: none;
    border: none;
    text-transform: uppercase;
    padding: 14px 0;
    font-size: 12px;
    width: 100%;
    text-align: left;
  }
}
</style>
