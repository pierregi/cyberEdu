Vue.component('Caesar_cipher', {
  data: function () {
    return {
      title:"Caesar cipher ",
      themes: [
        {
          id: 1,
          subtitle: 'Cipher',
          description : "bonjour",
          exercise: '',
        },
        {
          id: 2,
          title: 'Decrypt with Key',
          description : "bonjour",
          exercise: '',
        },
        {
          id: 3,
          title: 'Decrypt without Key',
          description : "bonjour",
          exercise: '',
        }
      ],
      documentation:"",
      selectedTheme: null
    }
  },
  template: '#Caesar_cipher'
});
