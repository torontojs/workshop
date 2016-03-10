var postcss = require('postcss')
var random = require('random-js')()

module.exports = postcss.plugin('postcss-randomize', function(opts) {
  // @randomize example 1-5
  // @rand-props color blue,white

  return function (css) {
    css.walk(function(target) {
      if(target.type === 'atrule' && target.name === 'randomize') {
        var params = target.params.split(' ')
        var className = params[0]
        var range = params[1].split('-')
        var min = parseInt(range[0], 10)
        var max = parseInt(range[1], 10)
        var randomRules = []

        for(var i = min; i < max + 1; i++) {
          var newRule = postcss.rule({ selector: '.' + className + '-' + i
                                     , nodes: target.nodes
                                     })

          randomRules.push(newRule)
        }

        target.replaceWith(randomRules)


        randomRules.forEach(function(rr) {
          rr.nodes = rr.nodes.map(function(child) {
            if(!(child.type === 'atrule' && child.name === 'rand-props')) {
              return child
            }

            var params = child.params.split(' ')
            var prop = params[0]
            var values = params[1].split(',')

            return postcss.decl({ prop: prop
                                , value: randomValue(values)
                                })

          })
        })
      }
    })
  }
})

function randomValue(values) {
  return values[random.integer(0, values.length - 1)]

}
