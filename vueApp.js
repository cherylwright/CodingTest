//call to api endpoint
const url = "https://frontiercodingtests.azurewebsites.net/api/accounts/getall";
//vue construct to format api data
const vm = new Vue({
        el: '#app',
        data: {
          active: [],
          inactive: [],
          overdue: []
        },
        mounted() {
          axios.get(url).then(response => {
            this.active = response.data.filter(record => record.AccountStatusId === 0);
            this.inactive = response.data.filter(record => record.AccountStatusId === 1);
            this.overdue = response.data.filter(record => record.AccountStatusId === 2);
          });
        },
        //adds $ to amount
        filters: {
          currencyFilter(amount, currency) {
            return `${currency}${amount}`;
          },
          //formats date to mm/dd/yyyy
          dateFilter(date) {
            const month = date.slice(5, 7);
            const day = date.slice(8, 10);
            const year = date.slice(0, 4);
            return `${month}/${day}/${year}`;
          }
        },
        //formats phone number to (xxx) xxx-xxxx
        methods: {
          formatPhoneStr(phoneNum) {
            let filteredPhoneNum = phoneNum.replace(/[^0-9xX]/g, "").replace(/[xX]/g, "x");
            switch (filteredPhoneNum.length) {
              case (10):
                return filteredPhoneNum.replace(/(...)(...)(....)/g, "($1) $2-$3");
              case (11):
                if (filteredPhoneNum.substr(0, 1) == "1") {
                  return filteredPhoneNum.substr(1).replace(/(...)(...)(....)/g, "($1) $2-$3");
                }
                break;
              default:
            }
            return phoneNum
          },
          
        }
      });