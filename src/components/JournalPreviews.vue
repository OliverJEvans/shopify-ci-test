<template>
  <div class="journal-previews">
    <div class="journal-previews__header container">
      <h2 class="journal-previews__title">The Journal</h2>
      <a class="journal-previews__link" href="#">Read all stories</a>
    </div>
    <carousel :settings="settings" :breakpoints="breakpoints">
      <slide v-for="entry in journalEntries" :key="entry.id">
        <JournalTile :entry="entry" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import journalQuery from "@/graphql/queries/JournalTiles.gql";
import { unwrapNodes } from "@/helpers/graphql";
import { RelayConnection } from "@/helpers/pagination";
import JournalTile from "@/components/JournalTile";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
export default {
  name: "JournalPreviews",
  components: {
    JournalTile,
    Carousel,
    Slide,
  },
  data() {
    return {
      journal: {
        articles: new RelayConnection(),
      },
      settings: {
        itemsToShow: 1.5,
        snapAlign: "left",
        wrapAround: "true",
      },
      breakpoints: {
        992: {
          itemsToShow: 2.5,
          snapAlign: "left",
        },
      },
    };
  },
  computed: {
    journalEntries() {
      return unwrapNodes(this.journal.articles?.edges);
    },
  },
  apollo: {
    journal: {
      query: journalQuery,
      update: (data) => data.blog,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/helpers";

.journal-previews {
  padding: 30px 0 60px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 16px;
    font-weight: normal;
    text-transform: uppercase;

    @include respond-above(md) {
      font-size: 30px;
    }
  }

  &__link {
    color: $color-dark;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.49px;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
