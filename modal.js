Vue.component('open-modal',{
    template : `
      <div id="overlay">
          <div id="content">
            <p>モーダルウィンドウ</p>
            <h2>新しい作業の追加</h2>
            <form  v-on:submit.prevent="clickdoadd">
                コメント <input type="text" ref="comment">
                <button type="submit">追加</button>
            </form>
            <button v-on:click="clickEvent">close</button>
          </div>
      </div>
      `,
    methods:{
      clickEvent: function(){
        this.$emit('from-child')
      },

      clickdoadd:function(){
          this.$emit('from-child2')
      }
    }
  })