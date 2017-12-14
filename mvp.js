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

//Presenter
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
//运行时以View为入口
;(function() {
  var view = new View()
  view.init()
})()
