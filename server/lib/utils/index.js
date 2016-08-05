
/**
 * Module dependencies
 */

var jsoncsv = require('json-csv');
var uuid = require('node-uuid');
var config = require('config');
var logger = require('lib/logger');
var rpc = require('lib/rpc');

/**
 * Task maanger middleware
 */

exports.taskHandler = function(req, res, next) {
  var started = process.hrtime();

  if(!req.headers['x-request-id']) {
    logger('warn', 'x-request-id header not found. A new uuid was generated instead.');
    req.headers['x-request-id'] = uuid.v4();
  }

  function rpcHandler(err, data) {
    var elapsed = process.hrtime(started)[1] / 1000000000;
    var ruid = req.headers['x-request-id'];
    /* istanbul ignore next */
    if(err) {
      logger('err', err.toString());
      res.status(500);
      return next(new Error('Internal server error'));
    } else if(data.status !== 'SUCCESS') {
      res.status(500);
      logger('err', logTask(ruid, data.task_name, req.session.user, req.params.store_id,
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            data.task_id, data.status, elapsed));
      return next(new Error('Internal server error'));
    } else {
      logger('info', logTask(ruid, data.task_name, req.session.user, req.params.store_id,
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            data.task_id, data.status, elapsed));
    }

    try {
      var result = JSON.parse(data.result);
      res.status(result.status);
      if(result.error) return next(new Error(JSON.stringify(result.error)));
      req.data = result.results;
      req.result = result;
      next();
    } catch(e) {
      /* istanbul ignore next */
      logger('err', e);
      res.status(500);
      return next(new Error('Interval server error'));
    }
  }

  var argLen = req.taskArgs.length;
  if(argLen === 3) {
    req.taskArgs[2].headers = req.taskArgs[2].headers || {};
    req.taskArgs[2].headers['request-uid'] = req.headers['x-request-id'];
  } else if(argLen === 2) {
    req.taskArgs.push({'headers': { 'request-uid': req.headers['x-request-id'] }});
  }

  rpc.request.apply(rpc, req.taskArgs.concat(rpcHandler));
};

/**
 * Default task response
 */

exports.taskResponse = function(req, res, next) {
  res.json(req.result);
};

/**
 * Task respond first element
 */

exports.taskResponseFirst = function(req, res, next) {
  res.json(req.data[0]);
};

/**
 * Graceful response
 */

exports.gracefulResponse = function(req, res) {
  res.json('ok');
};

/**
 * User is authenticated
 */

exports.isAuth = function(req, res, next) {
  /* istanbul ignore next */
  if(req.session.password_expired) {
    res.status(403);
    next(new Error('Forbidden'));
  } else if(req.session.user) {
    next();
  } else {
    res.status(401);
    next(new Error('Unauthorized'));
  }
};

/**
 * Export data
 */

exports.exportData = function(dataset, headers, taskName, formatRow) {
  var exportFields = headers.map(function(h){ return {name: h, label: h}; });
  return function(req, res) {
    var args = [req.session.user, req.params.store_id, req.query.live];
    delete req.query.live;
    req.query.page = 0;
    req.query.limit = 100;
    var env = req.query.live === 'true' ? 'live' : 'sandbox';
    res.setHeader('Content-disposition', 'attachment; filename=export_'+dataset+'_'+env+'.csv');
    res.type('text/csv');

    var csv = jsoncsv.csv({fields: exportFields});
    csv.pipe(res);

    function fetchData() {
      if(req.query.page > 1000) return csv.end();
      req.query.page++;
      req.taskArgs = [taskName, { 'kwargs': req.query, 'args': args }];
      exports.taskHandler(req, res, function(error){
        if(error) { return csv.end(); }
        var row;
        if(req.result.results.length) {
          for(var i = 0; i < req.result.results.length; i++) {
            row = formatRow(req.result.results[i]);
            csv.write(row);
          }
          fetchData();
        } else {
          csv.end();
        }
      });
    }

    fetchData();
  };
};


/**
 * Avatar sanitization
 */

exports.sanitizeAvatar = function(str) {
  var valid = /^https:\/\/www\.filepicker\.io\/api\/file\//.test(str);
  return valid ? str : config.assets.defaultAvatar;
};

/**
 * Logo sanitization
 */

exports.sanitizeLogo = function(str) {
  var valid = /^https:\/\/www\.filepicker\.io\/api\/file\//.test(str);
  return valid ? str : config.assets.defaultLogo;
};

exports.isMobile = function(ua) {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4));
};

/**
 * Log task format
 */
var logTask = exports.logTask = function(ruid, name, user, store, ip, id, status, elapsed) {
  var log = '[' + ruid  + '] [' + name + '] [' + (user || 'anon') + ':';
  log += (store || 'anon') + ']['+ ip + '] Task [' + id + '] status [' + status;
  log += '] in ' + elapsed + 's';
  return log;
}
