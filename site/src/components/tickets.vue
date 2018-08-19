<template>
  <div class="ticket-column">
    <ticket v-for="(item, index) in ticketsShown" :key="index" :address="item" :index="index + firstTicket" ></ticket>
  </div>
</template>
<script>
import ticket from "./ticket";

export default {
  components: {
    ticket
  },
  props: ["tickets", "visibleTicketRange"],
  computed: {
    ticketsShown: function() {
      let [beginningTicketIndex, endingTicketIndex] =
        this.visibleTicketRange || [];

      var ticketsShown = [];

      for (let i = beginningTicketIndex; i != endingTicketIndex; i++) {
        ticketsShown.push(this.tickets[i]);
      }
      return ticketsShown;
    },
    firstTicket: function() {
      let [beginningTicketIndex] = this.visibleTicketRange || [];
      return beginningTicketIndex || 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.ticket-column {
  margin: 50px auto auto auto;
  height: 147px;
  flex-flow: row wrap;
  justify-content: center;
  width: 83.333333%;
  display: flex;
  overflow: hidden;
}
</style>
