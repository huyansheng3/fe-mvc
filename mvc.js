/**
 *
 * Model层：
 * 用来封装数据以及处理数据的一些方法，一旦数据发生变化便通知相关视图
 * Model与View之间使用了观察者模式，View注册监听Model，更新View
 * View层：
 * 用来做数据的展示
 * View与Controller之间使用策略模式，View通过controller实例，实现特定的响应策略
 * Controller层：
 * 是模型与视图间的纽带，将响应机制封装到Controller中
 *
 */
// 执行渲染，暴露出事件的接口
function View(control) {
  let $num = $('.num')
  // view 类上暴露一个 render 方法即可
  this.render = function(model) {
    $num.text(model.getVal())
  }

  // 事件通过 control 处理
  $('.add').on('click', control.add)
}

// 核心在于 control 中处理事件等相关的业务逻辑, control 作为一个中间层
function Control() {
  let view = null
  let model = null
  this.init = function() {
    model = new Model()
    view = new View(this)
    // 初始化时渲染一次
    view.render(model)
    model.regist(view)
  }
  this.add = function() {
    model.add()
    model.notify()
  }
}

// 维护数据模型和相关逻辑
function Model() {
  let val = 0
  this.add = function() {
    val += 1
  }
  this.getVal = function() {
    return val
  }
  let views = []

  // 注册用到该模型的 view，一个数据模型可以对应多个 view
  this.regist = function(view) {
    views.push(view)
  }

  // 通知所有的 view 重新渲染
  this.notify = function() {
    views.map(view => {
      view.render(this)
    })
  }
}

//运行程序时，以Controller为入口
;(function() {
  var control = new Control()
  control.init()
})()
