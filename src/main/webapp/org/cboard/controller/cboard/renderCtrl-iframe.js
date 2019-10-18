cBoard.controller("renderCtrl", function(
  $timeout,
  $rootScope,
  $scope,
  $state,
  $location,
  $http,
  ModalUtils,
  chartService
) {
  $scope.loading = true;
  $scope.l = 1;
  $scope.persistFinish = false;
  $scope.row = {};

  var buildRender = function(w, reload) {
    w.render = function(content, optionFilter, scope) {
      w.persist = {};
      var chartType = w.widget.data.config.chart_type;
      try {
        if (chartType == "chinaMapBmap") {
          chartService.render(
            content,
            w.widget.data,
            optionFilter,
            scope,
            reload,
            w.persist
          );
          w.loading = false;
          $scope.l--;
        } else {
          chartService
            .render(
              content,
              w.widget.data,
              optionFilter,
              scope,
              reload,
              w.persist
            )
            .then(
              function(d) {
                w.realTimeTicket = d;
                w.loading = false;
                $scope.l--;
              },
              function(error) {
                $scope.l--;
              }
            );
        }
      } catch (e) {
        console.error(e);
      }
    };
  };

  function getSearch() {
    let s = location.search;
    return s
      .substring(1, s.length)
      .split("&")
      .reduce((res, d) => {
        let kv = d.split("=");
        if (kv[0]) {
          res[kv[0]] = kv[1];
        }
        return res;
      }, {});
  }

  $scope.load = function(reload) {
    let search = getSearch();
    let id = search.id;
    if (id) {
      $scope.loading = true;
      // 获取 widgets 并绘制
      $http
        .get("dashboard/getWidgetList.do?non-auth=1")
        .success(function(response) {
          $scope.loading = false;
          let curwidget = { widget: response.find(d => "" + d.id === id) };

          buildRender(curwidget, reload);
          curwidget.loading = true;
          curwidget.show = true;

          $scope.widgets = [curwidget];
        });
    } else {
      alert("无id");
    }
  };

  $scope.load(false);
});
