//Model与 mvc 比更独立，只关注数据层
function Model() {
  //模拟数据
  let val = 0
  //定义一个操作数据的方法跟一个返回数据的方法
  this.add = function() {
    val += 1
  }
  this.getVal = function() {
    return val
  }
}

//View层 与 mvc相比多了一个 presenter初始化的操作
function View() {
  //获取节点
  var $num = $('#num')
  var $add = $('#add')
  this.render = function(model) {
    $num.text(model.getVal())
  }
  this.init = function() {
    var presenter = new Presenter(this)
    $add.on('click', presenter.add)
  }
}

//Presenter 就是将 model 和 view 绑定到一块，model变化了通知 view 改变
function Presenter(view) {
  var _model = new Model()
  var _view = view
  _view.render(_model)
  this.add = function() {
    // Presenter 层就数据操作和 render 结合到一起，使得 数据驱动页面 render
    _model.add()
    _view.render(_model)
  }
}

// 对比三种写法，发现mvc 和 mvp 的写法都需要在数据改变后手动刷新试图，
// 所以一个 mvvm 框架的核心在于监听到数据变化后，最小化刷新试图
// mvc 的例子是所有的数据变化都调用 notifyAll，通知变化，类似的行为跟 backbone 类似，
// 即所有的数据变化都通过 set 操作进行，set 操作中额外更新试图
// mvp proxy 的写法就是跟 vue 类似，用的是 setter 和 getter

//运行时以View为入口
;(function() {
  var view = new View()
  view.init()
})()
