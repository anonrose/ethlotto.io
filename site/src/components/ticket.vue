<template>
  <div @click="purchaseTicket()" class="ticket-container" v-bind:class="[address == address0 ? 'for-sale': 'sold']">
    <div class="ticket-front lighten-1" v-bind:class="[address == address0 ? 'green' : 'grey']">{{index}}</div>
  </div>
</template>
<script>
import ticket from "./ticket";
import { ADDRESS_0 } from "../../static/constants";

export default {
  props: ["address", "index"],
  data() {
    return {
      address0: ADDRESS_0
    };
  },
  methods: {
    purchaseTicket() {
      debugger;
      if (this.address0 !== this.address)
        throw new Error("can not purchase a ticket that is already sold.");
      else console.log("purchsing ticket");
    }
  }
};
</script>

<style lang="scss" scoped>
.ticket-container {
  perspective: 30rem;
  border-radius: 16px;
  background-position: center center;
  cursor: pointer;
  margin-bottom: 6px;
  margin-right: 5px;
  margin-left: 5px;
  width: 90px;
  height: 32px;
  background-repeat: no-repeat;
  .ticket-front:hover {
    transform: rotateY(180deg);
  }
  &.sold {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='35px' width='95px'><text x='32' y='25' fill='white' font-size='17'>Sold</text></svg>");
    background-color: #c6bfc7;
  }
  &.for-sale {
    background-color: #95c1ad;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.…5px'><text x='15' y='22' fill='white' font-size='17'>Purchase</text></svg>");
  }
  .ticket-front {
    display: inline-block;
    height: 32px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    line-height: 32px;
    padding: 0 12px;
    border-radius: 16px;
    width: 90px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0 !important;
    margin-right: 0 !important;
    transition: transform 1s;
    backface-visibility: hidden;
  }
}
</style>

