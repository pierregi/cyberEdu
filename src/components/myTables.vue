<script>
export default {
  props: ['teams'],
  data () {
    return {
      col: 12
    }
  },
  render: function (createElement) {
    let childNode = []
    let nb = parseInt((this.teams.length - 3) / 3) + 1
    let a = nb <= 4 ? nb : 4
    switch (a) {
      case 1:
        this.col = 100
        break;
      case 2:
        this.col = 45
        break;
      case 3:
        this.col = 30
        break;
      default:
        this.col = 20
    }
    for (let i = 0 ; i < a ; i ++) {
      childNode.push(createElement(
        'b-table',   // nom de balise
        {
          props: {
            fields: [
              {
                key: 'placement',
                label: '#',
                tdClass: 'font-weight-bold align-middle'
              },
              {
                key: 'name',
                thStyle: {
                   display: 'none'
                },
                tdClass: 'align-middle'
              },
              {
                key: 'point',
                thStyle: {
                   display: 'none'
                },
                tdClass: 'align-middle'
              }
            ],
            items: this.teams.slice(3 + i * nb, 3 + (i + 1) * nb),
            borderless: true,
          },
          class: {
            'table-lg table-hover': true /* ,
            'col-2': this.col === 3,
            'col-3': this.col === 4,
            'col-5': this.col === 6,
            'col-12': this.col === 12*/
          },
          style: {
            width: this.col + '%'
          }
        }
      ))
    }
    return createElement(
     'b-row',
     {
       class: 'd-flex justify-content-between'
     },
     childNode
   )
  }
}
</script>
<style media="screen">
  .table tr {
    height: 75px;
    text-align: center;
    vertical-align: middle;
    font-size: 25px;
  }
  .table > thead {
    display:none !important;
  }
</style>
