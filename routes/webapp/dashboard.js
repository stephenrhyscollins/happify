const router =  require('express').Router();
const Exercise = require('../../models/exercise');
const Session = require('../../models/session');
const User = require('../../models/user');
var fs = require('fs');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

function authorise(req, res, next) {
  Session.findOne({
    "id" : req.param.sessionId,
    "user.id" : req.user.id
  },
  function(err, session){
    if(!err && session){
      next(req, res, session);
    }
    res.redirect('/dashboard');
  });
}


const authCheck = (req, res, next) => {
  if(req.user){next(); return;}
  res.redirect('/');
};

router.get('/', authCheck, (req, res) => {
  res.redirect('/dashboard/home');
});

router.get('/:view', authCheck, (req, res) => {
  res.render('dashboard', {user: req.user, m : process.env.MODE});
});


router.get('/:view/render', authCheck, (req, res) => {
  console.log("render");
  res.render("partial/"+req.params.view, {user: req.user, m : process.env.MODE});
});

/*router.get('/exercise/:sessionId', authCheck, (req, res) => {
  Session.
    findOne({
      _id : req.params.sessionId
    }).
    populate('user').
    populate('exercise').
    exec(function(err, session){
      console.log(session);
      if(err || (session.user.id != req.user.id)){}
      res.render('dashboard', {user: req.user, session : session, m : process.env.MODE, partial: session.exercise.view});
    });
});
*/
router.get('/exercises/:exerciseId', authCheck, (req, res) => {
    res.render('dashboard', {user: req.user, m : process.env.MODE});
});



//doesn't  work as using express
//creates a read stream that reads a file buffered and then piped
router.get('/pipedatafromfile', (req, res, next) => {
  console.log(`request from: ${req.url}`);
  res.writeHead(200, {'Content-Type': 'text/plain'})
  fs.createReadStream(__dirname + 'sample.txt', 'utf8').pipe(res);
})

router.get('/htmltest', (req, res, next) => {
  console.log(__dirname);
  //res.sendFile('./test.html');
});




function getExercise(exerciseId, callback){
  console.log(exerciseId);
  Exercise.findOne({_id:exerciseId}, function(err, exercise){
    if(err){
      console.log('error ' + err );
      callback(err, null);
    }else{
      console.log('users: ' + exercise);
      callback(null, exercise);
    }
  })
};



module.exports = router;
