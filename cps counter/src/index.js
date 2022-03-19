let app = Vue.createApp({
    data() {
      return {
        count: 0,
        finalCps: 0,
        finished: false,
        btnText: "Start"
      }
    },
    methods:{
        
        
        start() {
            this.count++;
            this.btnText = "keep pressing! :)";
            if(this.count === 1){
                setTimeout(function(){
                  app.finalCps= app.count / 5 ;
                  app.finished = true;
                  app.count = 0;
                },5000);
            }
        },
        restart(){
          this.finished=false;
          this.btnText = "Start";
        }
    }
}).mount('#app')