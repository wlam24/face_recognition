function HandleRegister(req, res, db, bcrypt) {

  console.info({ db, body: req.body })
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400).json('incorrect form submission');
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  console.info({ hash })
  db.transaction(trx => {
    console.info({ trx })
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        name: name,
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
     })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    console.error('Error......', err)
    res.status(400).json('Unable to register!')
  })
};

export default HandleRegister;
