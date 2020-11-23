var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}





const app = new Vue({

    el : "#app",
    data : {
        todos:[],
        options:[
          {value:-1,label:"すべて"},
          { value: 0,  label: '作業中' },
          { value: 1,  label: '完了' }
        ],
        current:-1,
        showContent: false
    },
    methods : {
      doAdd: function(event,value){
        var comment = this.$refs.openModal.$refs.comment
        // console.log(value)
        // console.log(comment)
        // console.log(comment.value)
        if(!comment.value.length){
          // console.log(comment.value)
          return
        }

        this.todos.push({
          id: todoStorage.uid++,
          comment: comment.value,
          state:0
        })
        comment.value = ""

      
      },

      doChangeState: function(item){
        item.state = item.state ? 0 : 1
      },

      doRemove: function(item){
        var index = this.todos.indexOf(item)
        this.todos.splice(index,1)
      },

      openModal: function(){
        this.showContent = true
      },
      closeModal: function(){
        this.showContent = false
      }  
    },

    watch:{
      todos:{
        handler: function(todos){
          todoStorage.save(todos)
        },
        deep:true
      }
    },

    created(){
      this.todos = todoStorage.fetch()
    },

    computed:{
      computedTodos:function(){
        return this.todos.filter(function(el){
          return this.current < 0 ? true :this.current === el.state
        },this)
      },
      labels(){
        return this.options.reduce(function(a,b){
          return Object.assign(a, {[b.value]:b.label})
        },{})
      }
    }
});

// Vue.component('open-modal',{

//   template : `
//     <div id="overlay" v-on:click="clickEvent">
//         <div id="content">
//           <p>これがモーダルウィンドウです。</p>
//           <button v-on:click="clickEvent">close</button>
//         </div>
//     </div>
//     `,

//     methods:{
//       clickEvent: function(){
//         this.$emit('from-child')
//       }
//     }

// });