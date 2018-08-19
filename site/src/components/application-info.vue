<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="info in appInfo" :key="info.i" v-bind:class="[materialSize]" >
        <v-card dark class="info-container" color="secondary">
          <v-card-media src="info.logo"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{info.title}}</h3>
              <div class="info-content" v-html="info.content"></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :href="info.link.href" target="_blank" color="blue">{{info.link.text}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "application-info",
  data() {
    return {
      materialSize: "xs6",
      windowWidth: 0,
      appInfo: [
        {
          i: 0,
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:
            '<ul style="padding:15px; list-style:none;"><li>Create an Ethereum Wallet using Meta Mask</li><li>Purchase ETH</li><li>Visit our site</li><li>Purchase a Ticket</li></ul>',
          link: {
            text: "INSTRUCTIONAL VIDEO",
            href: "https://youtu.be/AKH1TPrlOWU"
          }
        },
        {
          i: 1,
          title: "Public",
          logo: "../assets/ethereum-logo.png",
          content:
            '<ul style="padding:15px; list-style:none;"><li>Open Source</li><li>Each transaction is publicly available</li><li>Winners are verifiable via the Ethereum Blockchain</li></ul>',
          link: {
            text: "HOW SECURE IS 256BIT ENCRYPTION?",
            href: "https://www.youtube.com/watch?v=S9JGmA5_unY"
          }
        },
        {
          i: 2,
          title: "Ether",
          logo: "../assets/ethereum-logo.png",
          content:
            '<p style="padding:15px; list-style:none;">Listed under the code ETH it is the value token of the Ethereum blockchain.</p>',
          link: {
            text: "READ THE WHITE PAPER",
            href: "https://github.com/ethereum/wiki/wiki/White-Paper"
          }
        },
        {
          i: 3,
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:
            '<ul style="padding:15px; list-style:none;"><li>Secured Purchases</li><li>Anonymous - Decentralized and Distributed</li><li>Contract-oriented, high-level languages - Solidity</li></ul>',
          link: {
            text: "LEARN SOLIDITY",
            href: "https://github.com/ethereum/solidity/"
          }
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      let sizeContainers = () => {
        this.materialSize = window.innerWidth < 610 ? "m8" : "xs6";
      };
      window.addEventListener("resize", sizeContainers);
      sizeContainers();
    });
  }
};
</script>

<style lang="scss" scoped>
.info-container {
  height: 250px important;
  .info-content {
    text-align: left;
  }
}
</style>
