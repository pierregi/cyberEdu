<script>
export default {
  props: ['teams'],
  data () {
    return {
      col: 0
    }
  },
  render: function (createElement) {
    let childNode = []
    let nb = Math.ceil(this.teams.length / 3)
    let a = nb <= 3 ? nb : 3
    switch (a) {
      case 1:
        this.col = 12
        break
      case 2:
        this.col = 6
        break
      default:
        this.col = 4
    }
    for (let i = 0; i < a; i++) {
      let team
      if (nb <= 3) {
        team = this.teams.slice(i * 3, (i + 1) * 3)
      } else {
        team = this.teams.slice(i * nb, (i + 1) * nb)
      }
      childNode.push(
        createElement(
          'b-col',
          {
            props: {
              cols: 12,
              sm: 6,
              lg: this.col
            },
            class: 'px-0 px-lg-3 m-0'
          },
          [
            createElement(
              'b-table',
              {
                props: {
                  fields: [
                    {
                      key: 'placement',
                      label: '#',
                      tdClass: 'align-middle colorGold'
                    },
                    {
                      key: 'name',
                      thStyle: {
                        display: 'none'
                      },
                      tdClass: 'align-middle color text-break'
                    },
                    {
                      key: 'point',
                      thStyle: {
                        display: 'none'
                      },
                      tdClass: 'align-middle color'
                    }
                  ],
                  items: team,
                  borderless: true
                },
                class: {
                  'table-lg table-hover m-0 myTable': true
                } /* ,
                style: {
                  width: this.col + '%'
                } */
              }
            )
          ]
        )
      )
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
  .myTable tr {
    height: 75px;
    text-align: center;
    vertical-align: middle;
    font-size: 25px;
  }
  .myTable > thead {
    display:none !important;
  }
  .colorGold {
    color: #ffbe14;
    font-size: 4vmin;
  }
</style>
