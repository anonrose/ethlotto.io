<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="info in appInfo" xs6>
        <v-card dark color="secondary">
          <v-card-media :src="info.logo" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{info.title}}</h3>
              <div v-html="info.content"></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat :href="info.link.href" target="_blank" color="orange">{{info.link.text}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'application-info',
  data () {
    return {
      appInfo: [
        {
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:"<ul><li>Create an Ethereum Wallet using Meta Mask</li><li>nPurchase ETH</li><li>Visit our site</li><li>Purchase a Ticket</li></ul>",
          link: { text:"INSTRUCTIONAL VIDEO" , href:"https://youtu.be/AKH1TPrlOWU" }
        },{
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:"<ul><li>Create an Ethereum Wallet using Meta Mask</li><li>nPurchase ETH</li><li>Visit our site</li><li>Purchase a Ticket</li></ul>",
          link: { text:"INSTRUCTIONAL VIDEO" , href:"https://youtu.be/AKH1TPrlOWU" }
        },{
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:"<ul><li>Create an Ethereum Wallet using Meta Mask</li><li>nPurchase ETH</li><li>Visit our site</li><li>Purchase a Ticket</li></ul>",
          link: { text:"INSTRUCTIONAL VIDEO" , href:"https://youtu.be/AKH1TPrlOWU" }
        },{
          title: "How to purchase a ticket",
          logo: "../assets/ethereum-logo.png",
          content:"<ul><li>Create an Ethereum Wallet using Meta Mask</li><li>nPurchase ETH</li><li>Visit our site</li><li>Purchase a Ticket</li></ul>",
          link: { text:"INSTRUCTIONAL VIDEO" , href:"https://youtu.be/AKH1TPrlOWU" }
        }
      ]
    }
  }
}

</script>
