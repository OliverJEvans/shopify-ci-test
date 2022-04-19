<template>
  <h1>{{ journal.title }}</h1>
  <ul>
    <li v-for="entry in journalEntries" :key="entry.id">
      <h2>{{ entry.title }}</h2>
      <img :src="entry.image.url" />
    </li>
  </ul>
</template>

<script>
import journalQuery from "@/graphql/queries/Journal.gql";
import { unwrapNodes } from "@/helpers/graphql";
import { RelayConnection } from "@/helpers/pagination";

export default {
  name: "NavigationJournalPage",
  data() {
    return {
      journal: {
        articles: new RelayConnection(),
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
