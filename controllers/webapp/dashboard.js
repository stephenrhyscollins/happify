const router =  require('express').Router();
var fs = require('fs');
var bodyParser = require('body-parser');
router.use(bodyParser.json());


const authCheck = (req, res, next) => {
    if(req.user){next(); return;}
    res.redirect('/');
  };
router.get('/', authCheck, (req, res) => {
  res.render('dashboard', {user : req.user, m : process.env.MODE});
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




router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;
