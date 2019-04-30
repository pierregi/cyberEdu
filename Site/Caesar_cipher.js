// ############################## Variables of Components ##############################

var data_vigenere_cipher={
    currentTab: 'Cipher',
    themes: ['Cipher','Decrypt with key']
};
var data_caesar_cipher={
    currentTab: 'Cipher',
    themes: ['Cipher','Decrypt with key']
};

// ##############################  Caesar Cipher Exercice ##############################

Vue.component('tab-caesar_cipher-decrypt_with_key', { 
  data: function () {
  	return {
              subtitle: 'Decrypt with Key',
              description : "bonjour",
              exercise: {
                  text : "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.",
                  zone : "<textarea></textarea>"
              }
    }
  },
  template : `
    <div class="selected-post" >
        <h3>{{ subtitle }}</h3>
        <p>{{ description }}</p>
        <form action=''>
            <textarea></textarea>
        </form>
    </div>`
});

Vue.component('tab-caesar_cipher-cipher', { 
  data: function () {
  	return {
              subtitle: 'Cipher',
              description : "In this exercise, you will have to encrypt the following text with Caesar cipher technique. To encrypt, you will use a key of 15.",
              exercise: {
                  text : "\"In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.\"",
                  zone : ""
                  
              }
    }
  },
  template : `
    <div class="selected-post" >
        <h3>{{ subtitle }}</h3>
        <p class="description">{{ description }}</p>
        <p>{{ exercise.text }}</p>
        <form action=''>
            <textarea ></textarea>
            <button>Send</button>
        </form>
    </div>`
});

// ##############################  Vigenere Cipher Exercice ##############################

Vue.component('tab-vigenere_cipher-decrypt_with_key', { 
  data: function () {
  	return {
              subtitle: 'Decrypt with Key',
              description : "bonjour",
              exercise: {
                  text : "In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.",
                  zone : "<textarea></textarea>"
              }
    }
  },
  template : `
    <div class="selected-post" >
        <h3>{{ subtitle }}</h3>
        <p>{{ description }}</p>
        <form action=''>
            <textarea></textarea>
        </form>
    </div>`
});

Vue.component('tab-vigenere_cipher-cipher', { 
  data: function () {
  	return {
              subtitle: 'Cipher',
              description : "In this exercise, you will have to encrypt the following text with Caesar cipher technique. To encrypt, you will use a key of 15.",
              exercise: {
                  text : "\"In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques.\"",
                  zone : ""
                  
              }
    }
  },
  template : `
    <div class="selected-post" >
        <h3>{{ subtitle }}</h3>
        <description v-bind:description='description'></description>
        <p>{{ exercise.text }}</p>
        <form action=''>
            <textarea ></textarea>
            <button>Send</button>
        </form>
    </div>`
});

// ############################## Main Compenent ##############################

Vue.component('caesar_cipher', {
    props: ['liste'],
  data: function(){
        return {
            myData : data_caesar_cipher
        }
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-caesar_cipher-' + this.myData.currentTab.toLowerCase().replace(" ","_")
    },
    

  },
    template :`<main_page v-bind:data='myData' v-bind:liste='liste' v-bind:currentTabComponent='currentTabComponent'></main_page>`
})

Vue.component('vigenere_cipher', {
    props: ["liste"],
  data: function () {
    return {
        myData : data_vigenere_cipher
    }
        
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-vigenere_cipher-' + this.myData.currentTab.toLowerCase().replace(/ /g,"_")
    }
  },
    template : "<main_page v-bind:data='myData' v-bind:liste='liste' v-bind:currentTabComponent='currentTabComponent'></main_page>"
})
