<template>
  <div class="ticket-column">
    <ticket v-for="(address, index) in ticketsShown" :key="index" :address="address" :index="index + firstTicket" v-on:purchase-ticket="$emit('purchase-ticket', index + firstTicket)"/>
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
    ticketsShown() {
      let [beginning, ending] = this.visibleTicketRange || [];

      var ticketsShown = [];

      for (let ticket of this.tickets.slice(beginning, ending)) {
        ticketsShown.push(ticket);
      }
      return ticketsShown;
    },
    firstTicket() {
      let [beginning] = this.visibleTicketRange || [];
      return beginning || 0;
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
