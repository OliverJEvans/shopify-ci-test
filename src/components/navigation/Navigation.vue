<template>
  <ul class="navigation">
    <li v-for="link in links" :key="link.url">
      <template v-if="hasChildLinks(link)">
        <Accordion class="navigation__dropdown" show-arrow>
          <template #header>{{ link.title }}</template>
          <template #body>
            <ul>
              <li v-for="childLink in link.links" :key="childLink.url">
                <a :href="childLink.url" class="navigation__child-link">{{
                  childLink.title
                }}</a>
              </li>
            </ul>
          </template>
        </Accordion>
      </template>
      <a v-else :href="link.url" class="navigation__link">
        {{ link.title }} <i class="icon-arrow-right" />
      </a>
    </li>
  </ul>
</template>

<script>
import Accordion from "@/components/Accordion.vue";
export default {
  name: "Navigation",
  components: {
    Accordion,
  },
  data() {
    return {
      links: window.NavigationBarLinks,
    };
  },
  methods: {
    hasChildLinks(link) {
      if (link.links.length > 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.navigation__link {
  padding: 14px 20px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  color: $color-dark;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  i {
    font-size: 20px;
  }
}

.navigation__dropdown {
  transition: 0.25s ease background-color;

  ::v-deep(button) {
    width: 100%;
    padding: 14px 20px;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    color: $color-dark;
    background: none;
    outline: none;
    border: none;
    font-family: $body-font-family;
  }
}

.navigation__child-link {
  padding: 10px 0;
  display: block;
  font-size: 10px;
  text-decoration: none;
  color: $color-dark;
}

.navigation__dropdown.accordion--open {
  background-color: $color-light;
}

.navigation__dropdown ::v-deep(.accordion__body) {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
}
</style>
