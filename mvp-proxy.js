let tmp = 0,
  _view
const model = {}
Object.defineProperty(model, 'val', {
  get: function() {
    return tmp
  },
  set: function(x) {
    tmp = x
    _view.render(model)
  },
})

//View层 与 mvc相比多了一个 presenter初始化的操作
function View() {
  //获取节点
  var $num = $('#num')
  var $add = $('#add')
  this.render = function(model) {
    $num.text(model.val)
  }
  this.init = function() {
    var presenter = new Presenter(this)
    $add.on('click', presenter.add)
  }
}

//Presenter
function Presenter(view) {
  var _model = model
  _view = view
  _view.render(_model)
  this.add = function() {
    // Presenter 层就数据操作和 render 结合到一起，使得 数据驱动页面 render
    _model.val += 1
  }
}
//运行时以View为入口
;(function() {
  var view = new View()
  view.init()
})()
